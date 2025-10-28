import { useState } from "react";
import { Select } from "./componets/Select";

const cityOptions = [
  { value: "", label: "Choose a city", disabled: true },
  { value: "nyc", label: "New York" },
  { value: "bos", label: "Boston" },
  { value: "chi", label: "Chicago" },
  { value: "sea", label: "Seattle" },
];

export default function App() {
  const [city, setCity] = useState("");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [errorMode, setErrorMode] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const showError = errorMode && !city;

  return (
    <main className="min-h-screen w-full bg-white">
      <section className="mx-auto max-w-2xl px-6 py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Select</h1>
        </header>

        <div className="card grid gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setSize("sm")}
              className={`btn ${size === "sm" ? "btn-active" : ""}`}
            >
              size: sm
            </button>
            <button
              onClick={() => setSize("md")}
              className={`btn ${size === "md" ? "btn-active" : ""}`}
            >
              size: md
            </button>
            <button
              onClick={() => setSize("lg")}
              className={`btn ${size === "lg" ? "btn-active" : ""}`}
            >
              size: lg
            </button>

            <label className="ml-auto flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={errorMode}
                onChange={(e) => setErrorMode(e.target.checked)}
              />
              show error
            </label>

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              disabled
            </label>
          </div>

          <Select
            label="City"
            required
            size={size}
            disabled={disabled}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            options={cityOptions}
            helperText={
              !showError ? "Pick the city you like the most" : undefined
            }
            error={showError ? "Please choose a city" : undefined}
          />

          <div className="text-sm text-slate-600">
            current value:{" "}
            <span className="font-medium text-slate-900">{city || "none"}</span>
          </div>
        </div>

        <div className="card mt-6 grid gap-3">
          <h2 className="text-lg font-semibold">Disabled example</h2>
          <Select
            label="Country"
            disabled
            options={[
              { value: "", label: "Select country", disabled: true },
              { value: "us", label: "United States" },
              { value: "ca", label: "Canada" },
            ]}
            helperText="Disabled for demo"
          />
        </div>
      </section>
    </main>
  );
}
