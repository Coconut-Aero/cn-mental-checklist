<script>
export function evaluate(answers) {
    const results = []
    const totalScore = answers.slice(0, 9).reduce((acc, raw) => acc + raw, 0);
    const countThrees = answers.slice(0, 9).filter(x => x === 3).length;
    const hasThreeInFirstTwo = answers[0] === 3 || answers[1] === 3;

    let DepressedExtent = '几乎无抑郁症状'
    if (totalScore > 4 && totalScore < 10) {
        DepressedExtent = '轻微抑郁倾向'
    } else if (totalScore >= 10 && totalScore < 15) {
        DepressedExtent = '中等程度抑郁'
    } else if (totalScore >= 15 && totalScore < 19) {
        DepressedExtent = '较严重的抑郁'
    } else if (totalScore >= 20) {
        DepressedExtent = '严重抑郁'
    }

    results.push({
        title: '结果总分',
        result: totalScore,
        full_mark: 27,
        status: DepressedExtent
    })

    let isDepressed = '否'
    let boolIsDepressed = 0
    if ( countThrees > 3 ){
        isDepressed = '是'
        boolIsDepressed = 1
    }
  
    results.push({
        title: '是否抑郁',
        result: boolIsDepressed,
        full_mark: 1,
        status: isDepressed
    })

    let isMajorDepressed = '否'
    let boolIsMajorDepressed = 0
    if ( countThrees > 4 ){
        boolIsMajorDepressed = 1
        isMajorDepressed = '是'
    }

    results.push({
        title: '是否重度抑郁',
        result: boolIsMajorDepressed,
        full_mark: 1,
        status: isMajorDepressed
    })

    let isOtherDepressed = '否'
    let boolIsOtherDepressed = 0
    if ( countThrees > 1 && countThrees < 5 && hasThreeInFirstTwo ){
        isOtherDepressed = '是'
        boolIsOtherDepressed = 1
    }

    results.push({
        title: '是否其他抑郁',
        result: boolIsOtherDepressed,
        full_mark: 1,
        status: isOtherDepressed
    })

    let effect = '没有困难'
    if (answers[9] === 0){
        effect = '没有困难'
    } else if (answers[9] === 1) {
        effect = '轻微困难'
    } else if (answers[9] === 2) {
        effect = '中等困难'
    } else if (answers[9] === 3) {
        effect = '严重困难'
    }

    results.push({
        title: '对生活的影响',
        result: answers[9],
        full_mark: 3,
        status: effect
    })

    return results

}
</script>
