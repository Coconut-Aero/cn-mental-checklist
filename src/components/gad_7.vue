<script>
export function evaluate(answers) {
    const results = []
    const totalScore = answers.reduce((acc, raw) => acc + raw , 0)

    let AnxietyExtent = '没有或轻微'
    let caption = '您的结果显⽰您⽬前没有或只有轻微的焦虑症状。我们⿎励您继续监测⾃⼰的情绪，并确保饮⻝健康，减少饮酒，增加⾝体和社交活动的时间。'
    if (totalScore > 4 && totalScore < 10) {
        AnxietyExtent = '轻微'
        caption = '您的结果显⽰您⽬前是轻微的焦虑症状。我们⿎励您继续监测⾃⼰的情绪，并确保饮⻝健康，减少饮酒，增加⾝体和社交活动的时间。'
    } else if (totalScore >= 10 && totalScore < 15) {
        AnxietyExtent = '中度'
        caption = '焦虑是可以治疗的。请考虑联系您的医⽣谈论您的症状，以解决可能存在的任何医学问题。您的医⽣还可能能够向⼼理咨询师提供转诊。'
    } else if (totalScore >= 15 && totalScore <= 21) {
        AnxietyExtent = '重度'
        caption = '很可能焦虑严重地⼲扰了您⽣活的多个⽅⾯，您应该⽴即寻求专业帮助。与您的医⽣讨论您的症状和治疗选择。如果您有⾃残的想法，请⽴即寻求专业帮助。请记住，您是可以获得帮助的。'
    }

    results.push({
        title: '结果总分',
        result: totalScore,
        full_mark: 21,
        status: AnxietyExtent,
        caption: caption
    })

    return results

}
</script>
