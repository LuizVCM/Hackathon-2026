import TelaAutenticacao from '../../components/TelaAutenticacao'
import FormularioCadastro from './components/FormularioCadastro'

type Props = { onCadastrar: (codigo: string) => void; onEntrar: () => void }

const CadastroScreen = ({ onCadastrar, onEntrar }: Props) => (
  <TelaAutenticacao>
    <FormularioCadastro onCadastrar={onCadastrar} onEntrar={onEntrar} />
  </TelaAutenticacao>
)

export default CadastroScreen
