import TelaAutenticacao from '../../components/TelaAutenticacao'
import FormularioLogin from './components/FormularioLogin'

type Props = { onEntrar: () => void; onCriarConta: () => void }

const LoginScreen = ({ onEntrar, onCriarConta }: Props) => (
  <TelaAutenticacao>
    <FormularioLogin onEntrar={onEntrar} onCriarConta={onCriarConta} />
  </TelaAutenticacao>
)

export default LoginScreen
