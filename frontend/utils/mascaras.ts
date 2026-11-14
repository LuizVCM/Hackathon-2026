const soNumeros = (v: string) => v.replace(/\D/g, '')

export const formatarCpf = (v: string) => {
  const n = soNumeros(v).slice(0, 11)
  return n
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2')
}

export const formatarCelular = (v: string) => {
  const n = soNumeros(v).slice(0, 11)
  return n.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')
}

export const cpfCompleto = (v: string) => soNumeros(v).length === 11
export const celularCompleto = (v: string) => soNumeros(v).length === 11
