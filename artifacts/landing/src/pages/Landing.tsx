import { useState } from "react";
import { ContactModal } from "@/components/ContactModal";

const WA_DIRECT = "https://wa.me/5561996299003?text=" + encodeURIComponent("Olá! Vim pelo site e gostaria de saber mais sobre o JiMi Food!");

export default function Landing() {
  const [modal, setModal] = useState<"contact" | "support" | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-orange-500 tracking-tight">JiMi</span>
            <span className="text-2xl font-black text-gray-800 tracking-tight">Food</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#recursos" className="hover:text-orange-500 transition-colors">Recursos</a>
            <a href="#planos" className="hover:text-orange-500 transition-colors">Planos</a>
            <a href="#contato" className="hover:text-orange-500 transition-colors">Contato</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModal("support")}
              className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors"
            >
              Já sou cliente
            </button>
            <button
              onClick={() => setModal("contact")}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full opacity-40 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-100 rounded-full opacity-40 blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Sistema PDV para Self-Service & Açaí
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
              O sistema que <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">transforma</span> seu negócio
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
              PDV completo para restaurantes Self-Service KG e Sorveterias/Açaí. Controle seu caixa, estoque e vendas em tempo real com facilidade e agilidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" id="contato">
              <button
                onClick={() => setModal("contact")}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-orange-200 transition-all hover:scale-105"
              >
                Quero Conhecer o Sistema
              </button>
              <button
                onClick={() => setModal("support")}
                className="bg-white border-2 border-orange-200 hover:border-orange-400 text-orange-600 font-bold text-lg px-8 py-4 rounded-2xl transition-all hover:bg-orange-50"
              >
                Já sou Cliente / Suporte
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "500+", label: "Clientes Ativos" },
            { value: "99.9%", label: "Uptime Garantido" },
            { value: "24h", label: "Suporte Disponível" },
            { value: "5★", label: "Avaliação dos Clientes" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl font-black">{s.value}</div>
              <div className="text-sm font-medium text-orange-100 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RECURSOS */}
      <section id="recursos" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Funcionalidades</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">Tudo que você precisa em um só lugar</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "⚖️", title: "Pesagem Integrada", desc: "Integração com balanças digitais para cobrança automática por quilo." },
              { icon: "💰", title: "Controle de Caixa", desc: "Abertura, fechamento e relatórios detalhados do seu caixa diário." },
              { icon: "📦", title: "Gestão de Estoque", desc: "Controle de entrada e saída de produtos em tempo real." },
              { icon: "📊", title: "Relatórios Completos", desc: "Dashboards e relatórios de vendas, lucro e performance." },
              { icon: "🔄", title: "Multiplataforma", desc: "Acesse do computador, tablet ou smartphone de qualquer lugar." },
              { icon: "🛡️", title: "Backup Automático", desc: "Seus dados sempre seguros com backup automático na nuvem." },
            ].map((f) => (
              <div key={f.title} className="bg-orange-50 rounded-2xl p-6 hover:shadow-lg hover:shadow-orange-100 transition-all group">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Segmentos</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">Feito para o seu negócio</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100">
              <div className="text-5xl mb-5">🍽️</div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">Restaurante Self-Service KG</h3>
              <p className="text-gray-500 mb-5">Sistema completo com integração de balança, controle de fluxo de clientes e relatórios de vendas por quilo.</p>
              <ul className="space-y-2">
                {["Pesagem automática", "Controle de buffet", "Comandas digitais", "Relatórios em tempo real"].map(i => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-orange-500 font-bold">✓</span> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100">
              <div className="text-5xl mb-5">🍦</div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">Sorveteria / Açaí KG</h3>
              <p className="text-gray-500 mb-5">PDV otimizado para sorveterias e açaiterias com cobrança por peso, mix de sabores e controle de insumos.</p>
              <ul className="space-y-2">
                {["Cobrança por gramagem", "Mix de sabores", "Gestão de complementos", "Controle de freezers"].map(i => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-orange-500 font-bold">✓</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Planos</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">Escolha o plano ideal</h2>
            <p className="text-gray-500 mt-3">Sem taxa de adesão. Cancele quando quiser.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter", price: "Consulte", tag: null,
                desc: "Para quem está começando",
                features: ["1 terminal PDV", "Suporte via WhatsApp", "Relatórios básicos", "Backup automático"],
              },
              {
                name: "Profissional", price: "Consulte", tag: "Mais Popular",
                desc: "Para negócios em crescimento",
                features: ["Até 3 terminais PDV", "Suporte prioritário 24h", "Relatórios avançados", "Integração balança", "Dashboard gerencial"],
              },
              {
                name: "Enterprise", price: "Consulte", tag: null,
                desc: "Para redes e franquias",
                features: ["Terminais ilimitados", "Gerente de conta dedicado", "API integração", "Multifilial", "Treinamento presencial"],
              },
            ].map((p) => (
              <div key={p.name} className={`rounded-3xl p-7 border-2 relative ${p.tag ? "border-orange-400 shadow-xl shadow-orange-100" : "border-gray-100"}`}>
                {p.tag && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    {p.tag}
                  </span>
                )}
                <h3 className="text-xl font-black text-gray-800">{p.name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">{p.desc}</p>
                <div className="text-2xl font-black text-orange-500 mb-5">{p.price}</div>
                <ul className="space-y-2 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-orange-500 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setModal("contact")}
                  className={`w-full font-bold py-3 rounded-xl transition-all text-sm
                    ${p.tag
                      ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200"
                      : "bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200"}`}
                >
                  Solicitar Proposta
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-orange-100 text-lg mb-10">
            Fale agora com um especialista e receba uma proposta personalizada para o seu negócio.
          </p>
          <button
            onClick={() => setModal("contact")}
            className="bg-white hover:bg-orange-50 text-orange-600 font-black text-lg px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl"
          >
            Quero uma Demonstração Gratuita →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-gray-700">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-black text-orange-500">JiMi</span>
                <span className="text-2xl font-black text-white">Food</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Sistema PDV especializado para restaurantes Self-Service KG e Sorveterias/Açaí. Tecnologia que move o seu negócio.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#recursos" className="hover:text-orange-400 transition-colors">Recursos</a></li>
                <li><a href="#planos" className="hover:text-orange-400 transition-colors">Planos</a></li>
                <li>
                  <button onClick={() => setModal("contact")} className="hover:text-orange-400 transition-colors text-left">
                    Fale Conosco
                  </button>
                </li>
                <li>
                  <button onClick={() => setModal("support")} className="hover:text-orange-400 transition-colors text-left">
                    Suporte ao Cliente
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">📍</span>
                  <span>
                    Rua das Figueiras, Quadra 101, Lote 07<br />
                    Edifício Vista Shopping, 1º Andar, Lojas 56 a 59<br />
                    Águas Claras, Brasília/DF, 71906-750
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span>
                  <a href={WA_DIRECT} target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">
                    (61) 99629-9003
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 text-center space-y-2">
            <p className="text-sm text-gray-400">
              CNPJ: 13.470.201/0001-02
            </p>
            <p className="text-xs text-gray-500">
              JiMi Food 2026 | Todos os direitos reservados | Desenvolvido por André Neiva
            </p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOATING BUTTON */}
      <WhatsAppButton onClick={() => setModal("contact")} />

      {/* MODAL */}
      {modal && (
        <ContactModal type={modal} onClose={() => setModal(null)} />
      )}
    </div>
  );
}

function WhatsAppButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex items-center justify-center">
        {/* Spinning border ring */}
        <div
          className="absolute w-16 h-16 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #25D366, #128C7E, #25D366, transparent, transparent, #25D366)",
            animation: "spin 2.5s linear infinite",
          }}
        />
        {/* White gap ring */}
        <div className="absolute w-14 h-14 rounded-full bg-white" />
        {/* Button */}
        <button
          onClick={onClick}
          className="relative w-12 h-12 bg-[#25D366] hover:bg-[#20ba5a] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          aria-label="Fale conosco pelo WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.843L.057 23.143a.75.75 0 00.9.9l5.3-1.463A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.716 9.716 0 01-5.107-1.446l-.364-.217-3.135.865.843-3.138-.237-.374A9.75 9.75 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
