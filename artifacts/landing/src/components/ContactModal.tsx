import { useState } from "react";

interface ContactModalProps {
  onClose: () => void;
  type: "contact" | "support";
}

type Step = 1 | 2 | 3 | 4;

const PROFILE_OPTIONS = [
  { label: "Dono de restaurante Self-Service KG", value: "restaurante" },
  { label: "Sorveteria (Açaí) KG", value: "sorveteria" },
  { label: "Tenho interesse na revenda", value: "revenda" },
  { label: "Nenhuma das opções acima", value: "disqualified_profile" },
];

const PDV_OPTIONS = [
  { label: "Sim, mas busco outras soluções", value: "sim" },
  { label: "Não. Começando do Zero", value: "nao" },
];

const REVENUE_OPTIONS = [
  { label: "Até R$ 30.000,00", value: "disqualified_revenue" },
  { label: "De R$ 30.000,00 a R$ 80.000,00", value: "medio" },
  { label: "Acima de R$ 80.000,00", value: "alto" },
];

const WA_NUMBER = "5561996299003";

function buildWhatsAppMessage(
  type: "contact" | "support",
  profile: string,
  pdv: string,
  revenue: string,
  phone: string
): string {
  if (type === "support") {
    return `Olá! Já sou cliente JiMi Food e preciso de suporte. Meu WhatsApp para contato: ${phone}`;
  }

  const profileLabel = PROFILE_OPTIONS.find((o) => o.value === profile)?.label ?? profile;
  const pdvLabel = PDV_OPTIONS.find((o) => o.value === pdv)?.label ?? pdv;
  const revenueLabel = REVENUE_OPTIONS.find((o) => o.value === revenue)?.label ?? revenue;

  if (revenue === "medio") {
    return `Olá! Tenho interesse em conhecer melhor o JiMi Food.\n\nPerfil: ${profileLabel}\nUso de PDV: ${pdvLabel}\nFaturamento: ${revenueLabel}\nMeu WhatsApp: ${phone}`;
  }

  return `Olá! Tenho interesse em contratar o JiMi Food!\n\nPerfil: ${profileLabel}\nUso de PDV: ${pdvLabel}\nFaturamento: ${revenueLabel}\nMeu WhatsApp: ${phone}`;
}

export function ContactModal({ onClose, type }: ContactModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [profile, setProfile] = useState("");
  const [pdv, setPdv] = useState("");
  const [revenue, setRevenue] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [disqualified, setDisqualified] = useState(false);
  const [disqualifiedReason, setDisqualifiedReason] = useState("");

  function handleProfileSelect(value: string) {
    if (value === "disqualified_profile") {
      setDisqualified(true);
      setDisqualifiedReason("profile");
      return;
    }
    setProfile(value);
    setStep(2);
  }

  function handlePdvSelect(value: string) {
    setPdv(value);
    setStep(3);
  }

  function handleRevenueSelect(value: string) {
    if (value === "disqualified_revenue") {
      setDisqualified(true);
      setDisqualifiedReason("revenue");
      return;
    }
    setRevenue(value);
    setStep(4);
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.target.value));
    setPhoneError("");
  }

  function validatePhone(raw: string) {
    const digits = raw.replace(/\D/g, "");
    return digits.length === 11;
  }

  function handleSubmit() {
    if (!validatePhone(phone)) {
      setPhoneError("Informe um número válido no formato: DDD + 9 + XXXX-XXXX");
      return;
    }
    const rawDigits = phone.replace(/\D/g, "");
    const msg = buildWhatsAppMessage(type, profile, pdv, revenue, rawDigits);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onClose();
  }

  function handleSupportDirect() {
    const msg = `Olá! Já sou cliente JiMi Food e preciso de suporte. Meu WhatsApp para contato: ${phone.replace(/\D/g, "")}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onClose();
  }

  const progressSteps = type === "support" ? 1 : 4;
  const currentStep = type === "support" ? 4 : step;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="h-1 bg-gray-100">
          <div
            className="h-1 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-500"
            style={{ width: disqualified ? "100%" : `${(currentStep / (type === "support" ? 1 : 4)) * 100}%` }}
          />
        </div>

        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl font-light leading-none"
          >
            ×
          </button>

          {disqualified ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">😔</div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {disqualifiedReason === "profile"
                  ? "Agradecemos seu interesse!"
                  : "No momento não podemos te atender"}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {disqualifiedReason === "profile"
                  ? "Nosso sistema é especializado em restaurantes Self-Service KG e Sorveterias/Açaí. Não se encaixa no seu perfil atual."
                  : "Nosso sistema é ideal para negócios com faturamento acima de R$ 30.000/mês. Continue crescendo e volte em breve!"}
              </p>
              <button
                onClick={onClose}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Fechar
              </button>
            </div>
          ) : type === "support" ? (
            <SupportStep phone={phone} onPhoneChange={handlePhoneChange} phoneError={phoneError} onSubmit={handleSupportDirect} />
          ) : (
            <>
              {step === 1 && (
                <StepProfile onSelect={handleProfileSelect} />
              )}
              {step === 2 && (
                <StepPDV onSelect={handlePdvSelect} onBack={() => setStep(1)} />
              )}
              {step === 3 && (
                <StepRevenue onSelect={handleRevenueSelect} onBack={() => setStep(2)} />
              )}
              {step === 4 && (
                <StepPhone
                  phone={phone}
                  onChange={handlePhoneChange}
                  error={phoneError}
                  onSubmit={handleSubmit}
                  onBack={() => setStep(3)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StepProfile({ onSelect }: { onSelect: (v: string) => void }) {
  return (
    <div>
      <div className="mb-5">
        <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">Passo 1 de 4</span>
        <h2 className="text-xl font-bold text-gray-800 mt-1">Qual é o seu perfil?</h2>
        <p className="text-gray-500 text-sm mt-1">Selecione a opção que melhor descreve seu negócio</p>
      </div>
      <div className="space-y-3">
        {PROFILE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all text-sm
              ${opt.value === "disqualified_profile"
                ? "border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50"
                : "border-orange-100 text-gray-700 hover:border-orange-400 hover:bg-orange-50"}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepPDV({ onSelect, onBack }: { onSelect: (v: string) => void; onBack: () => void }) {
  return (
    <div>
      <div className="mb-5">
        <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">Passo 2 de 4</span>
        <h2 className="text-xl font-bold text-gray-800 mt-1">Você já utiliza algum sistema PDV (caixa)?</h2>
      </div>
      <div className="space-y-3">
        {PDV_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full text-left px-4 py-3 rounded-xl border-2 border-orange-100 text-gray-700 font-medium hover:border-orange-400 hover:bg-orange-50 transition-all text-sm"
          >
            {opt.label}
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors">← Voltar</button>
    </div>
  );
}

function StepRevenue({ onSelect, onBack }: { onSelect: (v: string) => void; onBack: () => void }) {
  return (
    <div>
      <div className="mb-5">
        <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">Passo 3 de 4</span>
        <h2 className="text-xl font-bold text-gray-800 mt-1">Qual é o faturamento mensal do seu negócio?</h2>
      </div>
      <div className="space-y-3">
        {REVENUE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all text-sm
              ${opt.value === "disqualified_revenue"
                ? "border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50"
                : "border-orange-100 text-gray-700 hover:border-orange-400 hover:bg-orange-50"}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors">← Voltar</button>
    </div>
  );
}

function StepPhone({
  phone, onChange, error, onSubmit, onBack
}: {
  phone: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <div className="mb-5">
        <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">Passo 4 de 4</span>
        <h2 className="text-xl font-bold text-gray-800 mt-1">Informe seu WhatsApp</h2>
        <p className="text-gray-500 text-sm mt-1">Formato: DDD + 9 + XXXX-XXXX</p>
      </div>
      <input
        type="tel"
        value={phone}
        onChange={onChange}
        placeholder="(61) 99999-9999"
        className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800 font-medium text-lg outline-none transition-all
          ${error ? "border-red-400 bg-red-50" : "border-orange-100 focus:border-orange-400"}`}
      />
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      <button
        onClick={onSubmit}
        className="mt-5 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.843L.057 23.143a.75.75 0 00.9.9l5.3-1.463A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.716 9.716 0 01-5.107-1.446l-.364-.217-3.135.865.843-3.138-.237-.374A9.75 9.75 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
        Falar no WhatsApp
      </button>
      <button onClick={onBack} className="mt-3 w-full text-sm text-gray-400 hover:text-gray-600 transition-colors">← Voltar</button>
    </div>
  );
}

function SupportStep({
  phone, onPhoneChange, phoneError, onSubmit
}: {
  phone: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phoneError: string;
  onSubmit: () => void;
}) {
  return (
    <div>
      <div className="mb-5">
        <div className="text-4xl mb-3">🛠️</div>
        <h2 className="text-xl font-bold text-gray-800">Suporte ao Cliente</h2>
        <p className="text-gray-500 text-sm mt-1">Informe seu WhatsApp para que possamos te atender com agilidade</p>
      </div>
      <input
        type="tel"
        value={phone}
        onChange={onPhoneChange}
        placeholder="(61) 99999-9999"
        className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800 font-medium text-lg outline-none transition-all
          ${phoneError ? "border-red-400 bg-red-50" : "border-orange-100 focus:border-orange-400"}`}
      />
      {phoneError && <p className="text-red-500 text-xs mt-2">{phoneError}</p>}
      <button
        onClick={onSubmit}
        className="mt-5 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.843L.057 23.143a.75.75 0 00.9.9l5.3-1.463A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.716 9.716 0 01-5.107-1.446l-.364-.217-3.135.865.843-3.138-.237-.374A9.75 9.75 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
        Falar com Suporte
      </button>
    </div>
  );
}
