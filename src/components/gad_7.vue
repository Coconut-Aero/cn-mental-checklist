<script>
export function evaluate(answers) {
    const results = []
    const totalScore = answers.reduce((acc, raw) => acc + raw , 0)

    let AnxietyExtent = '没有或轻微'
    let caption = '您的结果显示您目前没有或只有轻微的焦虑症状。我们鼓励您继续监测自己的情绪，并确保饮食健康，减少饮酒，增加身体和社交活动的时间。'

    if (totalScore > 4 && totalScore < 10) {
        AnxietyExtent = '轻微'
        caption = '您的结果显示您目前是轻微的焦虑症状。我们鼓励您继续监测自己的情绪，并确保饮食健康，减少饮酒，增加身体和社交活动的时间。'
    } else if (totalScore >= 10 && totalScore < 15) {
        AnxietyExtent = '中度'
        caption = '焦虑是可以治疗的。请考虑联系您的医生谈论您的症状，以解决可能存在的任何医学问题。您的医生还可能能够向心理咨询师提供转诊。'
    } else if (totalScore >= 15 && totalScore <= 21) {
        AnxietyExtent = '重度'
        caption = '很可能焦虑严重地干扰了您生活的多个方面，您应该立即寻求专业帮助。与您的医生讨论您的症状和治疗选择。如果您有自残的想法，请立即寻求专业帮助。请记住，您是可以获得帮助的。'
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
