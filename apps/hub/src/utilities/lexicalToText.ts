/**
 * @file Conversor de Lexical a texto plano
 * @description Contiene la lógica para transformar el formato de Lexical a un string simple.
 */

/**
 * Convierte el contenido de un campo RichText de Payload (formato Lexical) a una cadena de texto plano.
 * @param lexicalContent El objeto del campo richText.
 * @returns Una cadena de texto plano.
 */
export function lexicalToText(lexicalContent: any): string {
  if (!lexicalContent?.root?.children) {
    return '';
  }

  function extractText(node: any): string {
    if (node.type === 'text') {
      return node.text || '';
    }
    
    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractText).join('');
    }
    
    return '';
  }

  return lexicalContent.root.children.map(extractText).join('\n');
}
