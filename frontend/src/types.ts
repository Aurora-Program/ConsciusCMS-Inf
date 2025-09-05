export interface iSchemaPage {
    name: string,
    type: string,
  }
  
  
  
  export interface iSchemaField{
    name: string,
    component: string,
    CType: string,
    page: string,
    description: string,
    max: number
  }
  
  export type iSchemaState = {
    
    pages: iSchemaPage[],
    components: iSchemaField[],
    listComponents:iSchemaField[],
    selectedPage: iSchemaPage,
    selectedComponent:iSchemaField,
    subcomponents: iSchemaField[],
    deletingComponent: iSchemaField
  }

  export type iField ={
    Schema: iSchemaField,
    Value: Object,
    name: String
    
  }

  export type iPage ={
    Schema: iSchemaPage
    name: string
    values: object[]
  }

  export type iEditorState = {

    selectedPage: iPage
    pages: iPage[]

  }

  export type iValue ={




    
    name: string

  }