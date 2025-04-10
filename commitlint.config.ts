/**
 * @file Commitlint configuration for the Monorepo.
 * @author Gillian Tunney
 * @see [commitlint - Lint commit messages](https://commitlint.js.org/#/)
 */
import type { UserConfig as CommitlintUserConfig } from '@commitlint/types'
import { commitlint /*CommitlintUserConfig*/ } from '@snailicide/build-config'

const Configuration: CommitlintUserConfig = commitlint.configuration([
    'root',
    'ha-dashboard',
    'node-red-runtime',
    'home-assistant',
    'esphome',
    'openai',
    'todo:fix disable scope',
])

export default Configuration
