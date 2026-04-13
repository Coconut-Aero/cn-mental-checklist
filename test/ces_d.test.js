import { describe, it, expect } from 'vitest'
import { evaluate } from '../src/evaluators/ces_d'

describe('CES-D Evaluator', () => {
  it('should correctly evaluate zero depression', () => {
    // 20 questions, answer 0 to all except reverse scored questions which would be 0s inverted to 3s.
    // Let's just create an array of 20 zeros
    const answers = new Array(20).fill(0)
    
    const results = evaluate(answers)
    
    expect(results).toBeDefined()
    expect(results.length).toBe(1)
    
    // Reverse scored indices are 3, 7, 11, 15 (0-indexed).
    // For 20 zeros, 4 items reversed to 3 = 12 total score.
    expect(results[0].result).toBe(12)
    expect(results[0].status).toBe('无明显抑郁症状')
  })

  it('should correctly evaluate severe depression', () => {
    // Answer 3 to all, which means reverse questions become 0
    const answers = new Array(20).fill(3)
    
    const results = evaluate(answers)
    
    // 16 non-reverse questions answered 3 = 48. Reverse questions answered 3 -> 0 = 0. Total = 48
    expect(results[0].result).toBe(48)
    expect(results[0].status).toBe('可能存在重度抑郁')
  })
})
