class MultiPromiseError extends Error {
    constructor(errors) {
        super();
        this.errors = errors;
    }
}

export async function allResolved(prom) {
    var errors = [];

    for (var i = 0; i < prom.length; i++) {
        try {
            prom[i] = await prom[i];
        } catch (e) {
            errors.push(e);
        }
    }

    if (errors.length > 0) {
        throw new MultiPromiseError(errors);
    }
    
    return prom;
}
