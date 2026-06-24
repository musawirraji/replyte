// Render-only. The create/edit prospect form. All state + the submit flow live
// in AdminScreen; this is pure props-in, JSX-out.

export interface ProspectFields {
  slug: string;
  brand_name: string;
  agent_name: string;
  agent_phone: string;
  listing_address: string;
  logo_url: string;
  primary_color: string;
  listing_price: string;
  listing_beds: string;
  listing_baths: string;
  listing_description: string;
  photosText: string;
  tz: string;
}

export interface ProspectFormProps {
  fields: ProspectFields;
  onField: (name: keyof ProspectFields, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  mode: "create" | "edit";
  submitting: boolean;
  error: string | null;
}

function Field({
  label,
  name,
  fields,
  onField,
  placeholder,
  type = "text",
  full,
}: {
  label: string;
  name: keyof ProspectFields;
  fields: ProspectFields;
  onField: ProspectFormProps["onField"];
  placeholder?: string;
  type?: string;
  full?: boolean;
}) {
  return (
    <label className={`sl-adm-field${full ? " sl-adm-field--full" : ""}`}>
      <span>{label}</span>
      <input
        className="sl-input"
        type={type}
        value={fields[name]}
        onChange={(e) => onField(name, e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export function ProspectForm({
  fields,
  onField,
  onSubmit,
  onCancel,
  mode,
  submitting,
  error,
}: ProspectFormProps) {
  return (
    <form className="sl-adm-form" onSubmit={onSubmit}>
      <div className="sl-adm-form__head">
        <h2>{mode === "create" ? "New prospect" : "Edit prospect"}</h2>
        {mode === "edit" && (
          <button type="button" className="sl-adm-link" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="sl-adm-grid">
        <Field label="Slug (URL)" name="slug" fields={fields} onField={onField} placeholder="hannons-realty" />
        <Field label="Brand name" name="brand_name" fields={fields} onField={onField} placeholder="Hannon's Realty" />
        <Field label="Agent name" name="agent_name" fields={fields} onField={onField} placeholder="Jordan Avery" />
        <Field label="Agent phone" name="agent_phone" fields={fields} onField={onField} placeholder="+15555550123" />
        <Field label="Logo URL" name="logo_url" fields={fields} onField={onField} placeholder="https://…/logo.png" />
        <Field label="Brand colour (hex)" name="primary_color" fields={fields} onField={onField} placeholder="#1f6feb" />
        <Field label="Listing address" name="listing_address" fields={fields} onField={onField} placeholder="128 Lakeview Terrace, Austin, TX" full />
        <Field label="Price" name="listing_price" fields={fields} onField={onField} placeholder="875000" type="number" />
        <Field label="Beds" name="listing_beds" fields={fields} onField={onField} placeholder="4" type="number" />
        <Field label="Baths" name="listing_baths" fields={fields} onField={onField} placeholder="3" type="number" />
        <Field label="Timezone (IANA)" name="tz" fields={fields} onField={onField} placeholder="America/Chicago" />

        <label className="sl-adm-field sl-adm-field--full">
          <span>Description</span>
          <textarea
            className="sl-textarea"
            value={fields.listing_description}
            onChange={(e) => onField("listing_description", e.target.value)}
            placeholder="A light-filled modern home…"
          />
        </label>

        <label className="sl-adm-field sl-adm-field--full">
          <span>Photo URLs (one per line)</span>
          <textarea
            className="sl-textarea"
            value={fields.photosText}
            onChange={(e) => onField("photosText", e.target.value)}
            placeholder={"https://…/1.jpg\nhttps://…/2.jpg"}
          />
        </label>
      </div>

      {error && <p className="sl-form__error">{error}</p>}

      <button className="sl-btn" type="submit" disabled={submitting}>
        {submitting ? "Saving…" : mode === "create" ? "Create prospect" : "Save changes"}
      </button>
    </form>
  );
}
