"use client";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#131214",
          color: "#eae6f2",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <title>Error | weatherio</title>
        <h1 style={{ margin: 0, fontSize: "3rem" }}>Error</h1>
        <p style={{ margin: 0, fontSize: "1.25rem" }}>
          Something went wrong, please try again.
        </p>
        <button
          type="button"
          onClick={() => retry()}
          style={{
            marginTop: "0.5rem",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "500px",
            background: "#b5a1e5",
            color: "#100e17",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
