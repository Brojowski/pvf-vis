export default {
    touches(match)
    {
        let touches = []
        for (let s = 0; s < match.fullScoutData.scout.sets.length; s++) {
            let points = match.fullScoutData.scout.sets[s].events;
            for (let p = 0; p < points.length; p++) {
                if (points[p].exchange === undefined) continue;
                for (let t = 0; t < points[p].exchange.plays.length; t++) {
                    let touch = points[p].exchange.plays[t]
                    touch.setRef = s
                    touch.pointRef = p;
                    touch.touchRef = t;
                    touches.push(touch);
                }
            }
        }
        //console.log(touches)
        return touches
    }
}