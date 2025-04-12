<script>

/**
 * 因子映射
 */
export const factors = {
  somatization: [1, 4, 12, 27, 40, 42, 48, 49, 52, 53, 56, 58],
  obsessive: [3, 9, 10, 28, 38, 45, 46, 51, 55, 65],
  sensitive: [6, 21, 34, 36, 37, 41, 61, 69, 73],
  depression: [5, 14, 15, 20, 22, 26, 29, 30, 31, 32, 54, 71, 79],
  anxiety: [2, 17, 23, 33, 39, 57, 72, 78, 80, 86],
  hostility: [11, 24, 63, 67, 74, 81],
  phobia: [13, 25, 47, 50, 70, 75, 82],
  paranoia: [8, 18, 43, 68, 76, 83],
  psychoticism: [7, 16, 35, 62, 77, 84, 85, 87, 88, 90],
  other: [19, 44, 59, 60, 64, 66, 89]
}

export const factorStatus = {
  somatization: [24,36],
  obsessive: [20,30],
  sensitive: [18,27],
  depression: [26,39],
  anxiety: [20,30],
  hostility: [12,18],
  phobia: [14,21],
  paranoia: [12,18],
  psychoticism: [20,30],
  other: [14,21],
}

/**
 * 因子中文标题
 */
export const factorNames = {
  somatization: '躯体化',
  obsessive: '强迫症状',
  sensitive: '人际关系敏感',
  depression: '抑郁',
  anxiety: '焦虑',
  hostility: '敌对',
  phobia: '恐怖',
  paranoia: '偏执',
  psychoticism: '精神病性',
  other: '其他'
}



/**
 * 计算得分函数！传入回答数组，返回结构化的得分
 */
export function evaluate(answers) {
  const results = []

  // 总分
  const totalScore = answers.reduce((acc, raw) => acc + (raw + 1), 0)
  let totalStatus = '未知'
  let caption = '尚未能确定明确的心理症状状态，请确认测评是否完整。如有疑虑，建议与专业人士沟通。'

  if (totalScore < 210) {
    totalStatus = '轻微'
    caption = '您的测评结果显示当前心理状态较为稳定，未见明显的心理困扰。但建议继续保持良好的作息与情绪管理，适度表达情感，定期关注心理变化，有助于长期心理健康。'
  } else if (totalScore < 290) {
    totalStatus = '中度'
    caption = '您的测评结果提示存在一定程度的心理困扰，可能影响日常生活的部分方面。建议适当减轻压力、调整生活节奏，必要时可以考虑与心理咨询师进行一次交流，以获得进一步的支持与理解。'
  } else {
    totalStatus = '重度'
    caption = '您的测评结果表明目前可能存在较严重的心理困扰，建议尽快寻求专业的心理咨询或医疗支持。请记住，心理问题是可以被理解和帮助的，及时的关怀和干预将对您的生活产生积极影响。'
  }
    results.push({
    title: '结果总分',
    result: totalScore,
    full_mark: 90 * 5,
    status: totalStatus,
    caption: caption
  })

  // 各因子得分
  for (const [key, ids] of Object.entries(factors)) {
    const sum = ids.reduce((acc, qid) => acc + (answers[qid - 1] + 1), 0)

    let caption_status  = '未知'
    const [low, high] = factorStatus[key] || []

    let caption_class = key

    if (low !== undefined && high !== undefined) {
      if (sum < low) {
        caption_status = '轻微'
      } else if (sum < high) {
        caption_status  = '中度'
      } else {
        caption_status = '重度'
      }
    }


    results.push({
      title: factorNames[key],
      result: sum,
      full_mark: ids.length * 5,
      caption_class: caption_class,
      caption_status : caption_status
    })
  }

  return results
}
</script>
