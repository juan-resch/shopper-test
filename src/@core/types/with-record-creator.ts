/**
 * Represents a user involved in creating the data
 */
export type WithRecordCreator = {
  /**
   * @type {string} The unique identifier of the user
   */
  id: string
  /**
   * @type {string} The name of the user
   */
  name: string
  /**
   * @type {string} The avatar of the user
   */
  avatar?: string
}
