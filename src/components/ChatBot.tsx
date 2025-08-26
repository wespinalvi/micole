import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  payload?: any;
};

export default function ChatBot() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const { data } = await api.post("/chat", { message: trimmed });
      const text: string = data?.message ?? "Sin respuesta";
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text,
        payload: data,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text:
            error?.response?.data?.message ||
            "Ocurrió un error al consultar el chat.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderAssistantBlock = (m: ChatMessage) => {
    const payload = m.payload;
    if (payload?.intent === "cuotas" && Array.isArray(payload?.data) && payload.data.length > 0) {
      const alumno = payload.data[0];
      return (
        <div className="space-y-2">
          <p className="whitespace-pre-line">{m.text}</p>
          <div className="rounded-md border p-3 bg-muted/40">
            <div className="text-sm font-medium">{alumno.nombre} {alumno.ap_p} {alumno.ap_m} — DNI {alumno.dni}</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>Matrícula: {alumno.matricula_precio} — {alumno.matricula_estado ? "pagado" : "pendiente"}</div>
              {Array.from({ length: 10 }).map((_, i) => {
                const keyMonto = `c${i + 1}` as keyof typeof alumno;
                const keyEstado = `c${i + 1}_estado` as keyof typeof alumno;
                // @ts-ignore index via template
                const monto = alumno[keyMonto];
                // @ts-ignore index via template
                const estado = alumno[keyEstado];
                return (
                  <div key={i}>Cuota {i + 1}: {monto} — {estado ? "pagado" : "pendiente"}</div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    return <p className="whitespace-pre-line">{m.text}</p>;
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 shadow-lg"
      >
        Asistente
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Asistente del Director</DialogTitle>
          </DialogHeader>
          <div className="flex h-[420px] flex-col">
            <div className="mb-2 text-xs text-muted-foreground">
              Escribe instrucciones como: "muestrame las cuotas de los alumnos 73683521".
            </div>
            <div className="flex-1 overflow-hidden rounded-md border">
              <div className="h-full overflow-y-auto p-3 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground mt-12">
                    No hay mensajes. ¡Empieza a chatear!
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={
                        m.role === "user"
                          ? "ml-auto max-w-[85%] rounded-lg bg-primary text-primary-foreground px-3 py-2"
                          : "mr-auto max-w-[85%] rounded-lg bg-muted px-3 py-2"
                      }
                    >
                      {m.role === "assistant" ? renderAssistantBlock(m) : (
                        <p className="whitespace-pre-line">{m.text}</p>
                      )}
                    </div>
                  ))
                )}
                {loading && (
                  <div className="mr-auto max-w-[85%] rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                    Pensando...
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Input
                placeholder="Escribe tu mensaje y presiona Enter"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <Button onClick={sendMessage} disabled={loading || !input.trim()}>
                Enviar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


