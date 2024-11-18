export function deepCopy<T extends Array<any> | Record<string, any>>(obj: T) {
    const copy = Object.assign({}, obj) as T;

    for (const key in copy) {
        copy[key as any] = typeof obj[key] === 'object' ? deepCopy(obj[key as any]) : obj[key];
    }

    if (Array.isArray(obj)) {
        copy.length = obj.length;
        return Array.from(copy as any) as T;
    }

    return copy as T;
}

export function removeEmptyProperties(obj: any, onlyNullishValues = false) {
    return _removeEmptyProperties(obj, onlyNullishValues);
}

function _removeEmptyProperties(obj: any, onlyNullishValues = false, recursion = false) {
    const data = recursion ? obj : deepCopy(obj);

    for (const key in data) {
        const isPropertyObject = data[key] !== null && typeof data[key] === 'object';
        if (isPropertyObject) {
            _removeEmptyProperties(data[key], onlyNullishValues, true);
        }

        let shouldDelete = !data[key] || isEmpty(data[key]);

        if (onlyNullishValues) {
            shouldDelete = data[key] === null || data[key] === undefined;
        }

        if (shouldDelete) {
            delete data[key];
        }
    }

    if (isEmpty(data)) { return {}; }

    return data;
}

export function removeDuplicateValue(array: Array<any>, attribute = 'value') {
    const uniqueAddresses = Array
        .from(new Set(array.map(a => a[attribute])))
        .map(value => {
            return array.find(a => a[attribute] === value);
        });

    return uniqueAddresses;
}

export function isEmpty(obj: any) {
    if (!obj || typeof obj !== 'object') { return false; }
    return !Object.keys(obj).length;
}