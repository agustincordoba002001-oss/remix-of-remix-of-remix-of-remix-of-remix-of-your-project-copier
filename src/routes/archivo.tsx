import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, Film, Image as ImageIcon, MessageSquare, Music } from "lucide-react";

import { VIDEOS, AUDIOS, ILUSTRACIONES } from "@/lib/archivo-media";
import metodo from "../../docs/metodo-produccion.md?raw";
import pendientes from "../../docs/estado-y-pendientes.md?raw";
import historial from "../../docs/historial-chat.md?raw";

export const Route = createFileRoute("/archivo")({
  head: () => ({
    meta: [
      { title: "Archivo del proyecto — Cronos Estudio" },
      {
        name: "description",
        content:
          "Todos los videos terminados, muestras de voz, dibujos, guiones, el método de producción y el historial completo del proyecto Cronos.",
      },
      { property: "og:title", content: "Archivo del proyecto — Cronos Estudio" },
      {
        property: "og:description",
        content:
          "Videos, audios, dibujos, guiones e historial de todo lo hecho en Cronos, guardados dentro del proyecto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Archivo,
});

type Tab = "videos" | "audios" | "dibujos" | "metodo" | "historial";

const TABS: { id: Tab; label: string; icon: typeof Film }[] = [
  { id: "videos", label: "Videos", icon: Film },
  { id: "audios", label: "Voces y audios", icon: Music },
  { id: "dibujos", label: "Dibujos", icon: ImageIcon },
  { id: "metodo", label: "Cómo se hace", icon: BookOpen },
  { id: "historial", label: "Historial", icon: MessageSquare },
];

function Markdown({ text }: { text: string }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
      {text.split("\n").map((line, i) => {
        if (line.startsWith("# "))
          return (
            <h2 key={i} className="pt-4 font-display text-2xl text-foreground">
              {line.slice(2)}
            </h2>
          );
        if (line.startsWith("## "))
          return (
            <h3 key={i} className="pt-3 font-display text-lg text-foreground">
              {line.slice(3)}
            </h3>
          );
        if (line.startsWith("---")) return <hr key={i} className="border-border/60" />;
        if (line.startsWith("- ") || line.startsWith("1. ") || /^\d\. /.test(line))
          return (
            <p key={i} className="pl-4">
              {line.replace(/\*\*/g, "")}
            </p>
          );
        if (line.trim() === "") return null;
        return (
          <p key={i} className={line.startsWith("**") ? "text-foreground" : undefined}>
            {line.replace(/\*\*/g, "")}
          </p>
        );
      })}
    </div>
  );
}

function Archivo() {
  const [tab, setTab] = useState<Tab>("videos");

  return (
    <main className="min-h-screen">
      <div className="grain-overlay">
        <header className="mx-auto max-w-5xl px-6 pt-12 pb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al estudio
          </Link>
          <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            Archivo del <span className="text-gold">proyecto</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Todo lo que hicimos queda guardado acá dentro: los documentales
            terminados, las pruebas, las muestras de voz, los {ILUSTRACIONES.length} dibujos,
            los guiones, el método de trabajo y la conversación completa. Si alguien
            clona este proyecto, tiene exactamente lo mismo.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                  tab === t.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/70 text-muted-foreground hover:text-primary"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          {tab === "videos" && (
            <div className="grid gap-8 sm:grid-cols-2">
              {VIDEOS.map((v) => (
                <article
                  key={v.url}
                  className="overflow-hidden rounded-md border border-border/70 bg-card/70"
                >
                  <video src={v.url} controls preload="none" className="aspect-video w-full bg-black" />
                  <div className="p-4">
                    <p className="font-display text-base">{v.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{v.note}</p>
                    <a
                      href={v.url}
                      download
                      className="mt-3 inline-block text-xs text-primary underline"
                    >
                      Descargar
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {tab === "audios" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {AUDIOS.map((a) => (
                <div key={a.url} className="rounded-md border border-border/70 bg-card/70 p-4">
                  <p className="font-display text-base">{a.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.note}</p>
                  <audio src={a.url} controls preload="none" className="mt-3 w-full" />
                </div>
              ))}
            </div>
          )}

          {tab === "dibujos" && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ILUSTRACIONES.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="Dibujo del documental en estilo Volumen 1"
                  loading="lazy"
                  className="aspect-square w-full rounded-md border border-border/60 bg-white object-contain p-2"
                />
              ))}
            </div>
          )}

          {tab === "metodo" && (
            <div className="rounded-md border border-border/70 bg-card/60 p-6">
              <Markdown text={metodo} />
              <hr className="my-8 border-border/60" />
              <Markdown text={pendientes} />
            </div>
          )}

          {tab === "historial" && (
            <div className="rounded-md border border-border/70 bg-card/60 p-6">
              <Markdown text={historial} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
