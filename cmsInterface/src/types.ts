export interface iSchemaPage {
    name: string,
    type: string,
    page: string,
    CType: string,
    description: string,
    max: number
  }
  
  
  
  export interface iSchemaField{
    name: string,
    component: string,
    CType: string,
    page: string,
    description: string,
    max: number,
    order: number,
  default?: any
  // optional extras used across Schema UI
  identifier?: boolean
  required?: boolean
  options?: string[]
  min?: number | string
  pattern?: string
  typeOfFile?: string
  typeOfDate?: string
  memberOf?: string
  note?: string
  }
  
  export type iSchemaState = {
    
    pages: iSchemaPage[],
    components: iSchemaField[],
    listComponents:iSchemaField[],
    selectedPage: iSchemaPage,
    selectedComponent:iSchemaField,
    subcomponents: iSchemaField[],
    deletingComponent: iSchemaField,
    loading: boolean,
    error: any
  }

  export type iField ={
    Schema: iSchemaField,
    Value: Object,
    name: String
    
  }

  export type iPageValue = {
    component: string
    value: any
    name?: string
  }

  export type iListComponent = {
    name: string
    component: string
    CType: string
    page: string
    description: string
    max: number
    order: number
  }

  export type iPage ={
    Schema?: iSchemaPage
    name?: string
    Page: string
    Template: string
    values: iPageValue[]
    updateTime?: string
    updateUser?: string
    createdTime?: string
    creatorUser?: string
  }

  export type iEditorState = {
    selectedPage: iPage
    pages: iPage[]
    loading: boolean
    Error: any
    data?: any[]
  }

  export type iValue ={




    
    name: string

  }