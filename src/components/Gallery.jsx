import { useEffect, useState } from "react";

export default function Gallery({ items }) {
    const [index, setIndex] = useState(0);
    const [likes, setLikes] = useState({});
    const [favorites, setFavorites] = useState({});
    const [color, setColor] = useState("#ffb3d9");
    const [funky, setFunky] = useState(false);

    const current = items[index];
    useEffect(() => {
        const prev = document.body.style.background;
        document.body.style.background = color;
        return () => { document.body.style.background = prev; };
    }, [color]);

    const next = () => setIndex((i) => (i + 1) % items.length);
    const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

    const like = () =>
        setLikes((m) => ({ ...m, [current.id]: (m[current.id] ?? 0) + 1 }));

    const toggleFav = () =>
        setFavorites((m) => ({ ...m, [current.id]: !m[current.id] }));
    const cardText = funky ? "white" : "black";

    return (
        <section
            style={{
                padding: 16,
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,.15)",
                background: funky
                    ? "linear-gradient(135deg, #ff66c4, #9b5de5, #00bbf9)"
                    : "rgba(255,255,255,0.9)",
                color: cardText,
                maxWidth: 720,
                boxShadow: "0 8px 24px rgba(0,0,0,.08)"
            }}
        >
            <h2 style={{ marginTop: 0 }}>
                {current.title} {favorites[current.id] ? "⭐" : ""}
            </h2>


            <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
                <img
                    src={current.src}
                    alt={current.title}
                    style={{ width: "100%", display: "block", filter: "brightness(0.95)" }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(0,0,0,0.5)",
                        color: "white",
                        padding: "8px 12px",
                        fontWeight: 600
                    }}
                >
                    {current.title} — {likes[current.id] ?? 0} ❤
                </div>
            </div>


            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                <button onClick={prev}>Prev</button>
                <button onClick={next}>Next</button>
                <button onClick={like}> Like</button>
                <button onClick={toggleFav}>{favorites[current.id] ? "Unfavorite" : "Favorite ⭐"}</button>


                <button onClick={() => setFunky(f => !f)}>
                    {funky ? "Normal Card" : "Surprise BG (Card)"}
                </button>

               
                <label style={{ display: "inline-flex", alignItems: "center", gap: 6, marginLeft: 8 }}>
                    <span style={{ fontSize: 14, opacity: 0.85 }}>Page color:</span>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        aria-label="Pick page background color"
                    />
                </label>
            </div>
        </section>
    );
}
