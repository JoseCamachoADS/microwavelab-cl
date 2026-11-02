import type { Diccionario } from "./es";

export const ger: Diccionario = {
  idioma: {
    nombre: "Deutsch",
    corto: "DE",
    htmlLang: "de",
    og: "de_DE",
    hl: "de",
    places: "de",
    selector: "Sprache",
    cambiarA: "Wechseln zu {idioma}",
  },
  meta: {
    titulo: "Reparatur von Elektronikplatinen und Geräten",
    descripcion:
      "Elektroniklabor in La Cisterna, Santiago de Chile. Seit über {anios} Jahren Reparatur von Elektronikplatinen, I/O-Modulen, Netzteilen, Wechselrichtern und Touchscreen-Monitoren. {garantia} Monate Garantie.",
  },
  comun: {
    eslogan: "Elektroniklabor: Reparatur von Platinen und Geräten",
    descripcionEmpresa:
      "Wir betreiben ein Elektroniklabor mit mehr als 45 Jahren Erfahrung in der Reparatur aller Arten von Elektronikplatinen, Computern, Touchscreen-Monitoren, I/O-Modulen, Netzteilen, Ladegeräten und Wechselrichtern. Diagnoseservice mit persönlicher Betreuung, angepasst an Ihre Anforderungen.",
    horario: "Montag bis Donnerstag, 10:00 bis 19:00 Uhr; Freitag, 10:00 bis 13:00 Uhr",
    horarioCorto: "Mo bis Do 10:00 bis 19:00 Uhr · Fr 10:00 bis 13:00 Uhr",
    mensajeConsulta: "Guten Tag, ich möchte mich zur Reparatur eines Geräts erkundigen.",
    mensajeCotizar: "Guten Tag, ich hätte gern ein Angebot für die Reparatur eines Geräts.",
    telefonoNota: "(Anrufe und WhatsApp)",
    externo: "öffnet in einem neuen Tab",
  },
  nav: {
    principal: "Hauptmenü",
    servicios: "Leistungen",
    proceso: "Unser Ablauf",
    trayectoria: "Über uns",
    preguntas: "Fragen",
    preguntasLarga: "Häufig gestellte Fragen",
    contacto: "Kontakt",
    portal: "Status meines Geräts",
    portalCorto: "Mein Gerät",
    privacidad: "Datenschutz und Cookies",
    menuAbrir: "Menü öffnen",
    menuCerrar: "Menü schließen",
    multimedia: "Medien",
    inicioDe: "{nombre}, Startseite",
    pie: "Fußzeile",
    sitio: "Die Website",
    visitenos: "Besuchen Sie uns",
  },
  pie: {
    titulo: "Ihr Gerät lässt sich nicht einschalten?",
    texto:
      "Schildern Sie uns den Fehler, wir beraten Sie kostenlos. Über {anios} Jahre Erfahrung und {garantia} Monate Garantie auf jede Reparatur.",
    whatsapp: "Per WhatsApp schreiben",
    llamar: "Anrufen",
    derechos: "Alle Rechte vorbehalten.",
    irWaze: "Mit Waze navigieren",
    linkedin: "LinkedIn",
  },
  whatsapp: { aria: "Per WhatsApp schreiben", etiqueta: "WhatsApp" },
  cookies: {
    aria: "Cookie-Hinweis",
    texto:
      "Wir verwenden Mess-Cookies (Google Analytics und Microsoft Clarity), um zu verstehen, wie die Website genutzt wird, und sie zu verbessern. Für Werbung setzen wir sie nicht ein. Sie können zustimmen oder ablehnen.",
    mas: "Mehr Informationen",
    aceptar: "Akzeptieren",
    rechazar: "Nur notwendige",
  },
  contador: { etiqueta: "Besuche der Website", aria: "{total} Besuche der Website" },
  resenas: {
    ver: "Bewertungen auf Google ansehen",
    verTodas: "Alle Bewertungen auf Google ansehen",
    dejar: "Bewertung abgeben",
    fuente: "Google-Maps-Bewertungen",
    uno: "Bewertung",
    varias: "Bewertungen",
    enGoogle: "auf Google",
    estrellas: "{n} von 5 Sternen",
    usuario: "Google-Nutzer",
    notaIdioma: "Die Bewertungen werden in der Sprache angezeigt, in der sie verfasst wurden.",
  },
  mapa: { titulo: "Standortkarte von {nombre}" },
  clima: { etiqueta: "Aktuelles Wetter in Santiago", santiago: "Santiago", credito: "Wetterdaten:", despejado: "Klar", parcial: "Teilweise bewölkt", nublado: "Bewölkt", niebla: "Nebel", lluvia: "Regen", tormenta: "Gewitter", nieve: "Schnee", aguanieve: "Schneeregen" },
  aviso: { etiqueta: "Wichtiger Hinweis", pausar: "Hinweis anhalten", reanudar: "Hinweis fortsetzen" },
  clientes: { titulo: "Unternehmen, die uns vertrauen", pausar: "Karussell anhalten", reanudar: "Karussell fortsetzen" },
  multimedia: {
    meta: {
      titulo: "Medien",
      descripcion: "Fotos elektronischer Reparaturen in unserem Labor und Beiträge von Micro Wave Lab CL auf LinkedIn.",
    },
    titulo: "Medien",
    bajada: "Echte Reparaturen aus unserem Labor und die Neuigkeiten, die wir auf LinkedIn veröffentlichen.",
    fotos: {
      h: "Reparaturen in unserem Labor",
      intro: "Echte Diagnose- und Reparaturarbeiten. Tippen Sie auf ein Foto, um es größer zu sehen.",
      vacio: "Wir bereiten die Reparaturgalerie vor. In der Zwischenzeit finden Sie unsere Neuigkeiten auf LinkedIn.",
      todas: "Alle",
      filtro: "Nach Gerätetyp filtern",
      ampliar: "Foto vergrößern: {texto}",
      cerrar: "Schließen",
      anterior: "Zurück",
      siguiente: "Weiter",
      contador: "{n} von {total}",
    },
    linkedin: {
      h: "LinkedIn-Beiträge",
      intro: "Das Neueste, das wir als Unternehmen teilen: Arbeiten, Geräte und Neuigkeiten aus dem Labor.",
      cargar: "Beitrag hier ansehen",
      aviso: "Wenn Sie ihn hier ansehen, kann LinkedIn Daten Ihres Browsers speichern. Öffnen Sie ihn auf Wunsch direkt auf LinkedIn.",
      abrir: "Auf LinkedIn öffnen",
      verTodas: "Alle Beiträge auf LinkedIn ansehen",
      tituloPublicacion: "LinkedIn-Beitrag",
      mas: "Weitere Beiträge",
      publicacionN: "Beitrag {n} auf LinkedIn",
    },
  },
  tecnico: {
    meta: {
      titulo: "Technischer Service für die Industrie",
      descripcion:
        "Diagnose und Reparatur von Platinen, I/O-Modulen, Netzteilen, Wechselrichtern und Touchscreen-Monitoren von Industrieanlagen. Fordern Sie Ihr Angebot an.",
    },
    titulo: "Technischer Service für die Industrie",
    bajada: "Diagnose und Reparatur der Elektronik von Industrieanlagen, damit sie wieder laufen.",
    alcance: {
      h: "Leistungsumfang",
      items: [
        "Technische Diagnose elektrischer und elektronischer Fehler.",
        "Reparatur auf Bauteilebene von Platinen, I/O-Modulen, Netzteilen, Wechselrichtern und Touchscreen-Monitoren.",
        "Funktionstests vor der Übergabe.",
        "Beschaffung von Ersatzteilen, auch importierten.",
      ],
    },
    valor: {
      h: "Ihr Nutzen",
      items: [
        "Diagnose vor dem Angebot: Sie entscheiden mit allen Informationen.",
        "{garantia} Monate Garantie auf jede Reparatur.",
        "Statusverfolgung in Phasen, damit Sie wissen, wo Ihr Gerät steht.",
        "Über {anios} Jahre Erfahrung in der Elektronik.",
      ],
    },
    equipos: { h: "Geräte, die wir betreuen" },
    formulario: {
      titulo: "Angebot anfordern",
      intro: "Sagen Sie uns, um welches Gerät es geht und was nicht funktioniert. Je mehr Angaben, desto genauer unsere Antwort.",
      nota: "Wenn Sie fortfahren, sehen Sie Ihre fertig geschriebene Nachricht zur Kontrolle; danach öffnen Sie sie in WhatsApp und senden sie ab. Ihre Eingaben werden auf dieser Website nicht gespeichert.",
      encabezado: "Anfrage über die Website (technischer Service)",
      nombre: "Name",
      empresa: "Unternehmen",
      telefono: "Telefon",
      correo: "E-Mail",
      area: "Anliegen",
      equipo: "Gerätetyp",
      marca: "Hersteller und Modell",
      marcaAyuda: "Seriennummer, falls vorhanden",
      falla: "Fehler oder Frage",
      urgencia: "Dringlichkeit",
      opcional: "(optional)",
      seleccione: "Auswählen",
      areas: ["Gerätereparatur", "Garantie oder Kundendienst", "Allgemeine Anfrage", "Anregungen oder Beschwerden"],
      urgencias: ["Normal", "Dringend: das Gerät legt den Betrieb lahm", "Keine Eile"],
      enviar: "Weiter zu WhatsApp",
      traduciendo: "Nachricht wird vorbereitet...",
      revisarTitulo: "Prüfen Sie Ihre Nachricht",
      revisarTexto: "Das ist die Nachricht, die unser Team erhält: auf Spanisch und mit Ihrem Originaltext. Wenn alles stimmt, öffnen Sie sie in WhatsApp und senden Sie sie ab.",
      abrir: "WhatsApp öffnen",
      editar: "Erneut bearbeiten",
      idiomaCliente: "Sprache des Kunden",
      textoOriginal: "Originaltext ({idioma})",
      sinTraducir: "nicht übersetzt, verfasst auf {idioma}",
      captcha: {
        etiqueta: "Sicherheitsprüfung",
        requerido: "Bitte schließen Sie die Sicherheitsprüfung ab, bevor Sie fortfahren.",
        fallo: "Wir konnten nicht bestätigen, dass Sie ein Mensch sind. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per WhatsApp.",
      },
    },
  },
  inicio: {
    hero: {
      kicker: "Seit über {anios} Jahren in der Elektronikreparatur",
      titulo: "Steht Ihr Gerät still, bringen wir es wieder zum Laufen",
      texto:
        "Elektroniklabor, spezialisiert auf Platinen, I/O-Module, Netzteile, Wechselrichter und Touchscreen-Monitore. Professionelle Diagnose und {garantia} Monate Garantie.",
      cotizar: "Angebot per WhatsApp",
      llamar: "{telefono} anrufen",
    },
    queReparamos: {
      titulo: "Was wir reparieren",
      texto: "Industrielle und allgemeine Elektronik, repariert bis auf Bauteilebene.",
      ver: "Alle Leistungen ansehen",
    },
    trayectoria: {
      titulo: "{anios} Jahre Erfahrung in einer Werkstatt",
      linkedin: "Folgen Sie uns auf LinkedIn",
      porQue: "Warum wir",
      puntos: [
        { t: "Bewährte Erfahrung", d: "seit über {anios} Jahren in der Elektronikreparatur." },
        { t: "Garantie", d: "{garantia} Monate auf unsere Reparaturen." },
        { t: "Erst die Diagnose", d: "wir finden den Fehler, bevor wir ein Angebot machen." },
        { t: "Persönliche Betreuung", d: "wir richten uns nach Ihren Anforderungen." },
      ],
      proceso: "So läuft eine Reparatur ab",
    },
    ubicacion: {
      titulo: "So finden Sie uns",
      maps: "Route mit Google Maps",
      waze: "Route mit Waze",
    },
    resenas: { titulo: "Das sagen unsere Kunden" },
    preguntas: { titulo: "Häufig gestellte Fragen" },
  },
  servicios: {
    meta: {
      titulo: "Leistungen",
      descripcion:
        "Reparatur von Elektronikplatinen sowie von Industrie-, Medizin- und Fahrzeuggeräten.",
    },
    titulo: "Leistungen",
    bajada: "Wir betreuen elektronische Geräte aller Art, mit Schwerpunkt Industrie.",
    solicitar: "Angebot anfordern",
    items: {
      tarjetas: {
        titulo: "Elektronikplatinen",
        descripcion: "Diagnose und Reparatur aller Arten von Elektronikplatinen und Leiterplatten.",
      },
      industrial: {
        titulo: "I/O-Module und Industriegeräte",
        descripcion:
          "Reparatur von Ein-/Ausgabemodulen und der Elektronik von Industriegeräten.",
      },
      fuentes: {
        titulo: "Netzteile, Ladegeräte und Wechselrichter",
        descripcion:
          "Netzteile, Ladegeräte und Wechselrichter, repariert bis auf Bauteilebene.",
      },
      monitores: {
        titulo: "Industrielle Touchscreen-Monitore und Displays",
        descripcion:
          "Reparatur industrieller Touchscreen-Monitore bzw. Bedienoberflächen (HMI) und von Displays an Industrieanlagen.",
      },
      computadoras: {
        titulo: "Computer",
        descripcion: "Elektronische Diagnose und Reparatur von Computern.",
      },
      otros: {
        titulo: "Weitere Industriegeräte",
        descripcion:
          "Fahrzeug-, Medizin- und weitere Industriegeräte. Fragen Sie uns zu Ihrem Fall.",
      },
    },
  },
  proceso: {
    meta: {
      titulo: "Unser Ablauf",
      descripcion:
        "Die Phasen einer Reparatur bei Micro Wave Lab CL: Annahme, Diagnose, Angebot, Reparatur, Tests und Übergabe mit Garantie.",
    },
    titulo: "Unser Ablauf",
    bajada:
      "Jedes Gerät durchläuft dieselben Phasen, damit Sie immer wissen, wo Ihre Reparatur steht.",
    notaRepuesto: "Diese Phase tritt nur ein, wenn für die Reparatur ein Ersatzteil nötig ist.",
    garantiaAntes: "Auf alle unsere Reparaturen gewähren wir ",
    garantiaNegrita: "{garantia} Monate Garantie",
    garantiaDespues: ".",
    cta: "Zu meinem Gerät anfragen",
    pasos: {
      PRE_INGRESO: { etiqueta: "Anlieferung ausstehend", descripcion: "Wir haben Ihre Daten erhalten. Ihr Gerät muss noch in unserem Labor eintreffen." },
      RECEPCION: { etiqueta: "Angenommen", descripcion: "Ihr Gerät ist in unserem Labor eingetroffen." },
      REVISION: { etiqueta: "In Prüfung", descripcion: "Wir prüfen den Gesamtzustand des Geräts." },
      DIAGNOSTICO: { etiqueta: "In Diagnose", descripcion: "Wir ermitteln den Fehler und seine Ursachen." },
      PRESUPUESTO: { etiqueta: "Angebot gesendet", descripcion: "Wir haben Ihnen das Angebot zur Prüfung geschickt." },
      DECISION_CLIENTE: { etiqueta: "Warten auf Ihre Antwort", descripcion: "Wir warten darauf, dass Sie das Angebot annehmen oder ablehnen." },
      SOLICITUD_REPUESTO: { etiqueta: "Ersatzteil bestellt", descripcion: "Wir beschaffen ein Ersatzteil. Manche werden importiert und können länger dauern." },
      REPARACION: { etiqueta: "In Reparatur", descripcion: "Ihr Gerät wird repariert." },
      PRUEBAS: { etiqueta: "In Tests", descripcion: "Wir prüfen, ob das Gerät einwandfrei funktioniert." },
      LISTO_RETIRO: { etiqueta: "Abholbereit", descripcion: "Ihr Gerät ist fertig. Sie können es abholen." },
      ENTREGADO: { etiqueta: "Übergeben", descripcion: "Gerät übergeben. Vielen Dank für Ihr Vertrauen!" },
      RECHAZADO: { etiqueta: "Angebot abgelehnt", descripcion: "Das Angebot wurde nicht angenommen. Das Gerät liegt zur Rückgabe bereit." },
      SIN_REPARACION: { etiqueta: "Nicht reparierbar", descripcion: "Dieses Gerät konnte nicht repariert werden." },
    },
  },
  contacto: {
    meta: {
      titulo: "Kontakt",
      descripcion:
        "Kontaktieren Sie uns per Telefon oder WhatsApp oder besuchen Sie uns in der General Freire 80, La Cisterna, Santiago de Chile.",
    },
    titulo: "Kontakt",
    bajada: "Sagen Sie uns, welches Gerät repariert werden soll, wir antworten so schnell wie möglich.",
    telefonoNota: "Anrufe, Textnachrichten und WhatsApp.",
    whatsapp: "Per WhatsApp schreiben",
    maps: "Google Maps",
    waze: "Waze",
    formulario: {
      titulo: "Angebotsformular",
      texto:
        "Füllen Sie das Formular des technischen Service mit Ihrem Gerät und dem Fehler aus; WhatsApp öffnet sich mit Ihrer fertig geschriebenen Nachricht.",
      ir: "Zum Formular",
    },
  },
  portal: {
    meta: { titulo: "Status meines Geräts" },
    titulo: "Status meines Geräts",
    bajada:
      "Bald können Sie sich mit Ihrer E-Mail-Adresse anmelden, um zu sehen, in welcher Phase Ihre Reparatur steht, Ihr Angebot zu prüfen und anzunehmen und online zu bezahlen.",
    nota: "Wenn Sie bis dahin den Stand Ihres Geräts wissen möchten, schreiben Sie uns per WhatsApp mit Ihrem Namen und dem Gerät, das Sie bei uns abgegeben haben.",
  },
  privacidad: {
    meta: {
      titulo: "Datenschutz und Cookies",
      descripcion: "Welche Daten diese Website misst, mit welchen Werkzeugen und wie Sie die Messung ablehnen können.",
    },
    titulo: "Datenschutz und Cookies",
    bajada: "Was wir auf dieser Website messen, mit welchen Werkzeugen und wie Sie ablehnen können.",
    medimos: {
      h: "Was wir messen",
      intro:
        "Wenn Sie zustimmen, nutzen wir zwei Werkzeuge, um zu erfahren, wie viele Personen die Website besuchen, welche Seiten sie ansehen und ob sie die Schaltflächen für WhatsApp, Telefon oder Karte verwenden:",
      items: [
        {
          b: "Google Analytics 4:",
          t: "zusammengefasste Besuchsstatistiken, die wir anschließend in Looker-Studio-Berichten darstellen.",
        },
        {
          b: "Microsoft Clarity:",
          t: "Heatmaps und anonyme Aufzeichnungen der Navigation, um schwer bedienbare Stellen der Website zu erkennen. In Textfeldern eingegebener Text wird standardmäßig ausgeblendet.",
        },
      ],
    },
    contador: {
      h: "Besucherzähler",
      p: "Die Besucherzahl in der Fußzeile zählt nur, wie oft die Website aufgerufen wird. Sie speichert keine personenbezogenen Daten, verwendet keine Cookies und hängt nicht von Ihrer Entscheidung zur Messung ab.",
    },
    noHacemos: {
      h: "Was wir nicht tun",
      p: "Wir verwenden diese Cookies nicht für Werbung. Wir messen weder die Seiten zur Statusverfolgung von Geräten noch das interne Panel, in dem Kundendaten liegen.",
    },
    cambiar: {
      h: "So ändern Sie Ihre Entscheidung",
      p: "Wenn Sie \"Akzeptieren\" gewählt haben und das zurücknehmen möchten, löschen Sie die Daten dieser Website in den Browsereinstellungen, dann erscheint der Hinweis erneut. Cookies können Sie auch im Browser selbst blockieren.",
    },
    traduccion: {
      h: "Formular und Übersetzung",
      p: "Wenn Sie auf Englisch oder Deutsch schreiben, wird der Text zur Fehlerbeschreibung an den Dienst Google Cloud Translation gesendet und ins Spanische übersetzt, bevor sich WhatsApp öffnet, da unser Team auf Spanisch arbeitet. Der Text wird auf dieser Website nicht gespeichert.",
    },
    multimedia: {
      h: "Medien und LinkedIn",
      p: "Die Reparaturfotos werden auf dieser Website gehostet. LinkedIn-Beiträge werden nur geladen, wenn Sie die Schaltfläche des jeweiligen Beitrags drücken; in diesem Moment kann LinkedIn Daten Ihres Browsers erhalten und Cookies speichern, gemäß der eigenen Datenschutzerklärung.",
    },
    clima: {
      h: "Uhrzeit und Wetter",
      p: "Datum und Uhrzeit werden in Ihrem Browser berechnet. Das Wetter in Santiago fragt unser Server bei MET Norway (dem norwegischen Wetterdienst) ab; Sie verbinden sich nicht mit diesem Dienst und es werden keine Daten von Ihnen gesendet.",
    },
    seguridad: {
      h: "Sicherheit des Formulars",
      p: "Um automatische Nachrichten (Bots) zu verhindern, nutzt das Formular Cloudflare Turnstile, ein Captcha, das Sie fast nie etwas lösen lässt. Cloudflare erhält technische Daten Ihres Browsers nur, um zu prüfen, dass Sie ein Mensch sind; sie werden nicht für Werbung verwendet. Wir zählen, wie oft die externen Dienste der Website (Übersetzung, Bewertungen und dieses Captcha) aufgerufen werden, ohne personenbezogene Daten zu speichern.",
    },
    consultas: {
      h: "Fragen",
      conCorreo: "Bei Fragen zu Ihren Daten schreiben Sie uns an {correo} oder rufen Sie uns unter {telefono} an.",
      sinCorreo: "Bei Fragen zu Ihren Daten schreiben Sie uns per WhatsApp oder rufen Sie uns unter {telefono} an.",
    },
  },
  faq: [
    {
      pregunta: "Welche Arten von Geräten reparieren Sie?",
      respuesta:
        "Wir reparieren alle Arten von Elektronikplatinen, Computern, Touchscreen-Monitoren, I/O-Modulen, Netzteilen, Ladegeräten und Wechselrichtern. Steht Ihr Gerät nicht in der Liste, fragen Sie uns per Telefon oder WhatsApp.",
    },
    {
      pregunta: "Gibt es Garantie auf die Reparaturen?",
      respuesta: "Ja. Auf unsere Reparaturen gewähren wir {garantia} Monate Garantie.",
    },
    {
      pregunta: "Wie bekomme ich ein Angebot?",
      respuesta:
        "Zuerst prüfen und diagnostizieren wir Ihr Gerät. Mit dem Ergebnis senden wir Ihnen das Angebot, und Sie entscheiden, ob die Reparatur durchgeführt werden soll.",
    },
    {
      pregunta: "Wo finde ich Sie und wann haben Sie geöffnet?",
      respuesta: "Sie finden uns in der {calle}, {comuna}, Santiago de Chile. Unsere Öffnungszeiten: {horario}.",
    },
    {
      pregunta: "Wie kann ich Sie erreichen?",
      respuesta:
        "Per Anruf, Textnachricht oder WhatsApp unter der Hauptnummer, die auf dieser Seite steht.",
    },
  ],
};
