export const blockImgsLinks = (hero) => {
    if(!hero) return {hero: '', smallHero: ''};

    const img = hero?.[0] ?? '';
    let smallHero = '';
    if(hero && Array.isArray(hero) && hero.length > 1)
        smallHero = hero[1];


    return {hero: img, smallHero};
}