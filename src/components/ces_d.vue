<script>
export function evaluate(answers) {
    const reverseIndexSet = new Set([3, 7, 11, 15])  // 反向计分题索引：4, 8, 12, 16
    const results = []

    const totalScore = answers.reduce((acc, raw, index) => {
        // 对反向题目进行翻转：0 -> 3, 1 -> 2, 2 -> 1, 3 -> 0
        const score = reverseIndexSet.has(index) ? 3 - raw : raw
        return acc + score
    }, 0)

    let DepressionLevel = '无明显抑郁症状'
    let caption = '您的结果显示您目前没有明显的抑郁症状。请保持良好的生活作息和积极的社交活动。如有情绪变化请持续关注自身状态。'

    if (totalScore >= 16 && totalScore <= 26) {
        DepressionLevel = '可能存在轻度抑郁'
        caption = '您的结果显示可能存在轻度抑郁症状。建议多关注心理健康，适当休息与放松，必要时可以咨询心理专业人士。'
    } else if (totalScore >= 27) {
        DepressionLevel = '可能存在重度抑郁'
        caption = '您的结果显示可能存在较严重的抑郁症状，建议尽快寻求专业心理咨询或医生评估，以获得及时的帮助和支持。'
    }

    results.push({
        title: '结果总分',
        result: totalScore,
        full_mark: 60,
        status: DepressionLevel,
        caption: caption
    })

    return results
}
</script>
