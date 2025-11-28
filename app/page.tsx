export default function HomePage() {
    return (
        <main>
            <h1>CS391 OAuth Assignment</h1>
            <p>Home page is working.</p>

            <section style={{ marginTop: "2rem" }}>
                <h2>Sign in</h2>
                <p>We will use GitHub OAuth for authentication.</p>

                <a
                    href="/api/oauth/github"
                    style={{
                        display: "inline-block",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        border: "1px solid #000",
                        textDecoration: "none",
                    }}
                >
                    Sign in with GitHub
                </a>
            </section>
        </main>
    );
}
