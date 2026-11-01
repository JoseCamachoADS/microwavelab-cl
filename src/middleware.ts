import { NextResponse, type NextRequest } from "next/server";

// Idiomas: el español está en la raíz (sin prefijo), el inglés en /en y el alemán en /ger.
// Internamente el español se atiende como /es/..., pero esa dirección no se muestra:
//   /servicios      → (reescribe a) /es/servicios
//   /es/servicios   → (redirige a) /servicios
//   /en/... y /ger/... → pasan tal cual
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const primera = pathname.split("/")[1];

  if (primera === "es") {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (primera === "en" || primera === "ger") return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

// No aplica a la API, a los archivos internos de Next ni a archivos con extensión (imágenes, sitemap, robots...).
export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
