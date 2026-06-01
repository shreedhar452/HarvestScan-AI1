export default function LanguageSelector({
  language,
  setLanguage
}) {
  return (
    <div className="language-box">

      <label>
        Language:
      </label>

      <select
        value={language}
        onChange={(e) =>
          setLanguage(
            e.target.value
          )
        }
      >
        <option value="en">
          English
        </option>

        <option value="kn">
          Kannada
        </option>

        <option value="hi">
          Hindi
        </option>

        <option value="te">
          Telugu
        </option>

        <option value="ta">
          Tamil
        </option>
      </select>

    </div>
  );
}