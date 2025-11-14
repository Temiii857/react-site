import Gallery from "./components/Gallery.jsx";
import { photos } from "./data/photos.js";

export default function App() {
    return (
        <main style={{ padding: 24, display: "grid", placeItems: "start", gap: 16 }}>
            <h1>Interactive Gallery</h1>
            <p>Type to filter, click Prev/Next, and toggle the background.</p>
            <Gallery items={photos} />
        </main>
    );
}