export class Employee {
  private _empID: number
  private _empName: string
  private _empActive: boolean
  private _empDepartment: number

  get empID(): number {
    return this._empID
  }

  set empID(empID: number) {
    this._empID = empID
  }

  get empName(): string {
    return this._empName
  }

  set empName(empName: string) {
    this._empName = empName
  }

  get empActive(): boolean {
    return this._empActive
  }

  set empActive(empActive: boolean) {
    this._empActive = empActive
  }

  get empDepartment(): number {
    return this._empDepartment
  }

  set empDepartment(empDepartment: number) {
    this._empDepartment = empDepartment
  }

  constructor(empID: number = 0, empName: string = "", empActive: boolean = false, empDepartment: number = 0) {
    this._empID = empID
    this._empName = empName
    this._empActive = empActive
    this._empDepartment = empDepartment
  }
}


