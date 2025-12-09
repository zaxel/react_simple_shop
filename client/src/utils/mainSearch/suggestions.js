export const makeSuggestionSearchItems = (items, icon, alt, selected) => {
    const searchItems = items.map((el, i) => {
      return (
        <li
          key={i + 1}
          id={i}
          className={"suggestion__item" + (selected === i ? " active" : "")}
        >
          <div className="suggestion__item-container">
            <div className="suggestion__search-icon">
              <img src={icon} alt={alt} />
            </div>
            <p dangerouslySetInnerHTML={{ __html: el.highlighted_name }}></p>
          </div>
          <dl className="suggestion__device-info">
            <dt
              dangerouslySetInnerHTML={{ __html: el.info_highlighted_title }}
            ></dt>
            <dd
              dangerouslySetInnerHTML={{
                __html: el.info_highlighted_description,
              }}
            ></dd>
          </dl>
        </li>
      );
    });
    return searchItems;
  };