import { ImageResponse } from "next/og";

export const runtime = "edge";

// OG dinámico de marca (1200×630). Uso: /og?title=...&subtitle=...
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Departamentos amueblados de lujo").slice(0, 120);
  const subtitle = (searchParams.get("subtitle") || "").slice(0, 80);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171717",
          padding: "68px 76px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 9999,
              background: "#F4AD0B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#242323",
              fontSize: 42,
              fontWeight: 800,
            }}
          >
            M
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 800, letterSpacing: 3 }}>
            MAiA HOME
          </div>
        </div>

        {/* Título */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: "#F4AD0B",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 4,
                marginBottom: 18,
              }}
            >
              {subtitle}
            </div>
          ) : null}
          <div style={{ display: "flex", fontSize: 66, fontWeight: 800, lineHeight: 1.12, maxWidth: 1010 }}>
            {title}
          </div>
        </div>

        {/* Pie */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#c7c7c7",
            borderTop: "2px solid #F4AD0B",
            paddingTop: 22,
          }}
        >
          <div style={{ display: "flex" }}>maiahome.mx</div>
          <div style={{ display: "flex" }}>Polanco · Condesa · Houston</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
