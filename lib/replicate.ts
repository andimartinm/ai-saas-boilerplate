import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export interface ImageGenerationOptions {
  width?: number
  height?: number
  numOutputs?: number
  scheduler?: string
  numInferenceSteps?: number
  guidanceScale?: number
  negativePrompt?: string
}

export async function generateImageWithSDXL(
  prompt: string,
  options: ImageGenerationOptions = {}
) {
  const {
    width = 1024,
    height = 1024,
    numOutputs = 1,
    numInferenceSteps = 25,
    guidanceScale = 7.5,
    negativePrompt = '',
  } = options

  try {
    const output = await replicate.run(
      'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
      {
        input: {
          prompt,
          negative_prompt: negativePrompt,
          width,
          height,
          num_outputs: numOutputs,
          num_inference_steps: numInferenceSteps,
          guidance_scale: guidanceScale,
        },
      }
    )

    return {
      success: true,
      images: Array.isArray(output) ? output : [output],
    }
  } catch (error) {
    console.error('Replicate SDXL Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function generateImageWithFlux(
  prompt: string,
  options: {
    aspectRatio?: string
    numOutputs?: number
    outputFormat?: string
    outputQuality?: number
  } = {}
) {
  const {
    aspectRatio = '1:1',
    numOutputs = 1,
    outputFormat = 'webp',
    outputQuality = 80,
  } = options

  try {
    const output = await replicate.run(
      'black-forest-labs/flux-schnell',
      {
        input: {
          prompt,
          aspect_ratio: aspectRatio,
          num_outputs: numOutputs,
          output_format: outputFormat,
          output_quality: outputQuality,
        },
      }
    )

    return {
      success: true,
      images: Array.isArray(output) ? output : [output],
    }
  } catch (error) {
    console.error('Replicate Flux Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function upscaleImage(
  image: string,
  scale: number = 4
) {
  try {
    const output = await replicate.run(
      'nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b',
      {
        input: {
          image,
          scale,
        },
      }
    )

    return {
      success: true,
      image: output,
    }
  } catch (error) {
    console.error('Replicate Upscale Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export { replicate }
