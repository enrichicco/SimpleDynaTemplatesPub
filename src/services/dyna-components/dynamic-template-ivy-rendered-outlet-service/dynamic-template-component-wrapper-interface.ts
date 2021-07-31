export interface DynamicHtmlTemplateWrapperIvyRendered{
  extHtmlTemplate: string,
  buildSubcomponent(htmlTemplate: string) : void
}