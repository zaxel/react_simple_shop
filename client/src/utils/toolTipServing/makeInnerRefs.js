export const makeInnerRefs = (tipsArr, refs) => {
    if(!Array.isArray(tipsArr) || !tipsArr.length)return;
    const innerRefs = tipsArr.map((tip, i)=>{
        return{
            innerRef: el => (refs.current[i] = el),
            toolTipInfo: {i, myRefs: refs, text: tip}
        }
    })
    return innerRefs;
}