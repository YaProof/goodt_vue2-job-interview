const _searchFirstDataPropertyValue = (root, propertyName) => {
    if (root[propertyName] !== undefined) {
        return root[propertyName];
    }

    if (root.$children && root.$children.length) {
        for (let i = 0; i < root.$children.length; i++) {
            const result = _searchFirstDataPropertyValue(root.$children[i], propertyName);
            if (result !== false) {
                return result;
            }
        }
    }

    return false;
}

const _setMarkTag = (text, subText, tag) => {
    const str = text;
    const startText = subText.toUpperCase();
    
    const arr = str.split(' ');
    return arr.map(t => {
        const word = t.toUpperCase();
        if (word.startsWith(startText)) {
            const mark = `<${tag}>${t.slice(0, startText.length)}</${tag}>`;
            return mark + t.slice(startText.length);
        } else {
            return t;
        }
    }).join(' ');
}

const markText = (context, text) => {
  const searchText = _searchFirstDataPropertyValue(context.$root, 'searchText');
  return searchText ? _setMarkTag(text, searchText, 'mark') : text;
}

export { markText };