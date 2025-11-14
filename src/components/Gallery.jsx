import { useMemo, useState } from "react";

export default function Gallery({ items }) {
    const [index, setIndex] = useState(0);
    const [query, setQuery] = useState("");
    const [funky, setFunky] = useState(false);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;
        return items.filter(p =>
            p.title.toLowerCase().includes(q) || p.tags.some(t => t.includes(q))
        );
    }, [items, query]);

    const has = filtered.length > 0;
    const current = has ? filtered[index % filtered.length] : null;

    const next = () => has && setIndex(i => (i + 1) % filtered.length);
    const prev = () => has && setIndex(i => (i - 1 + filtered.length) % filtered.length);

    return (
        <section
            style={{
                padding: 16,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,.1)",
                background: funky
                    ? "linear-gradient(135deg, #ff66c4, #9b5de5, #00bbf9)"
                    : "white",
                color: funky ? "white" : "black",
                transition: "background 0.6s ease",
                maxWidth: 720,
            }}
        >

        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                <input
                    placeholder="Filter by title or tag…"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setIndex(0); }}
                    style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
                    aria-label="Filter images"
                />
                <button onClick={prev}>Prev</button>
                <button onClick={next}>Next</button>
                <button onClick={() => setFunky(f => !f)}>{funky ? "Normal BG" : "Surprise BG"}</button>
            </div>

            {has ? (
                <figure>
                    <img
                        src={current.src}
                        alt={current.title}
                        style={{ width: "100%", borderRadius: 12 }}
                    />
                    <figcaption style={{ marginTop: 8 }}>
                        <strong>{current.title}</strong> — tags: {current.tags.join(", ")}
                    </figcaption>
                </figure>
            ) : (
                <p>No matches. Try clearing the filter.</p>
            )}
        </section>
    );
}