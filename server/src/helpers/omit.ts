function omit<T>(obj: T, property: keyof T | (keyof T)[]){

    if(Array.isArray(property)){ //in case of multiple property omitting
        const entries = Object.entries({obj}).filter(item => {
            const [key] = item;

            return !property.includes(key as keyof T);
        })
        return Object.fromEntries(entries); 
    }

    const { [property]: unused, ...rest} = obj; //in case of single property omitting

    return rest;
}

export default omit;