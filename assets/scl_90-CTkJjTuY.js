const h={somatization:[1,4,12,27,40,42,48,49,52,53,56,58],obsessive:[3,9,10,28,38,45,46,51,55,65],sensitive:[6,21,34,36,37,41,61,69,73],depression:[5,14,15,20,22,26,29,30,31,32,54,71,79],anxiety:[2,17,23,33,39,57,72,78,80,86],hostility:[11,24,63,67,74,81],phobia:[13,25,47,50,70,75,82],paranoia:[8,18,43,68,76,83],psychoticism:[7,16,35,62,77,84,85,87,88,90],other:[19,44,59,60,64,66,89]},p={somatization:[24,36],obsessive:[20,30],sensitive:[18,27],depression:[26,39],anxiety:[20,30],hostility:[12,18],phobia:[14,21],paranoia:[12,18],psychoticism:[20,30],other:[14,21]},d={somatization:"躯体化",obsessive:"强迫症状",sensitive:"人际关系敏感",depression:"抑郁",anxiety:"焦虑",hostility:"敌对",phobia:"恐怖",paranoia:"偏执",psychoticism:"精神病性",other:"其他"};function m(c){const o=[],a=c.reduce((s,e)=>s+(e+1),0);let t="未知";a<210?t="轻微":a<290?t="中度":t="重度",o.push({title:"结果总分",result:a,full_mark:90*5,status:t});for(const[s,e]of Object.entries(h)){const n=e.reduce((u,f)=>u+(c[f-1]+1),0);let i="未知";const[l,r]=p[s]||[];l!==void 0&&r!==void 0&&(n<l?i="轻微":n<r?i="中度":i="重度"),o.push({title:d[s],result:n,full_mark:e.length*5,status:i})}return o}const y={};export{y as default,m as evaluate,d as factorNames,p as factorStatus,h as factors};
