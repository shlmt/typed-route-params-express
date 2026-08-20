import originalExpress from 'express'
import { typedParams } from './typedParams'

const express = typedParams(originalExpress)

export default express
