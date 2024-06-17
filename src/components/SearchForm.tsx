export default function SearchForm({
    searchText,
    onSearchTextChange,
}: {
    searchText: string;
    onSearchTextChange: (text: string) => void;
}) {
    return (
        <form
            className="search"
            onSubmit={e => e.preventDefault()}
        >
            <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            <input
                value={searchText}
                onChange={e => onSearchTextChange(e.target.value)}
                spellCheck="false"
                type="text"
                required
                placeholder="Find remote developer jobs..."
            />
        </form>
    );
}
