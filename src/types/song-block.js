
export const TYPES = {
    "chorus": "Refrão",
    "bridge": "Ponte",
    "intro": "Intro",
    "verse": "Verso",
    "solo": "Solo",
    "pre-chorus": "Pré-refrão"
}

export const typeMapping = (plainType) => TYPES[plainType] ?? plainType