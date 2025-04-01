import { useState, useEffect, useCallback } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { AiOutlineWarning } from 'react-icons/ai';
import './App.css'; // Importa el archivo CSS para estilos personalizados

const App = () => {
    const [apuestaQuini, setApuestaQuini] = useState(Array(6).fill(null));
    const [resultadoQuini, setResultadoQuini] = useState(Array(6).fill(null));
    const [coincidenciasQuini, setCoincidenciasQuini] = useState(null);
    const [numerosCoincidentesQuini, setNumerosCoincidentesQuini] = useState([]);
    const [apuestaBrinco, setApuestaBrinco] = useState(Array(6).fill(null));
    const [resultadoBrinco, setResultadoBrinco] = useState(Array(6).fill(null));
    const [coincidenciasBrinco, setCoincidenciasBrinco] = useState(null);
    const [numerosCoincidentesBrinco, setNumerosCoincidentesBrinco] = useState([]);
    const [error, setError] = useState(null);
    const [apuestaQuiniCompleta, setApuestaQuiniCompleta] = useState(false);
    const [resultadoQuiniCompleta, setResultadoQuiniCompleta] = useState(false);
    const [apuestaBrincoCompleta, setApuestaBrincoCompleta] = useState(false);
    const [resultadoBrincoCompleta, setResultadoBrincoCompleta] = useState(false);
    const [calcularAnimadoQuini, setCalcularAnimadoQuini] = useState(false);
    const [calcularAnimadoBrinco, setCalcularAnimadoBrinco] = useState(false);

    useEffect(() => {
        setApuestaQuiniCompleta(apuestaQuini.every(num => num !== null));
    }, [apuestaQuini]);

    useEffect(() => {
        setResultadoQuiniCompleta(resultadoQuini.every(num => num !== null));
    }, [resultadoQuini]);

    useEffect(() => {
        setApuestaBrincoCompleta(apuestaBrinco.every(num => num !== null));
    }, [apuestaBrinco]);

    useEffect(() => {
        setResultadoBrincoCompleta(resultadoBrinco.every(num => num !== null));
    }, [resultadoBrinco]);

    const handleApuestaQuiniChange = (index, value) => {
        const num = parseInt(value, 10);
        if (value === "") {
            const newApuesta = [...apuestaQuini];
            newApuesta[index] = null;
            setApuestaQuini(newApuesta);
            return;
        }

        if (!isNaN(num) && num >= 0 && num <= 45) {
            const newApuesta = [...apuestaQuini];
            newApuesta[index] = num;
            if (newApuesta.slice(0, index).includes(num)) {
                setError(`¡Ouch! Número duplicado en Quini: ${num}. ¡Solo números únicos, por favor!`);
                return;
            }
            setApuestaQuini(newApuesta);
            setError(null);
        } else {
            setError(`¡Ups! Ingresa un número válido (0-45) en la posición ${index + 1} del Quini.`);
        }
    };

    const handleResultadoQuiniChange = (index, value) => {
        const num = parseInt(value, 10);

        if (value === "") {
            const newResultado = [...resultadoQuini];
            newResultado[index] = null;
            setResultadoQuini(newResultado);
            return;
        }
        if (!isNaN(num) && num >= 0 && num <= 45) {
            const newResultado = [...resultadoQuini];
            newResultado[index] = num;
            if (newResultado.slice(0, index).includes(num)) {
                setError(`¡Ay caramba! Número duplicado en Resultado Quini: ${num}. ¡Necesitamos números diferentes!`);
                return;
            }
            setResultadoQuini(newResultado);
            setError(null);
        } else {
            setError(`¡No puede ser! Ingresa un número válido (0-45) en la posición ${index + 1} del Resultado Quini.`);
        }
    };

    const handleApuestaBrincoChange = (index, value) => {
        const num = parseInt(value, 10);
        if (value === "") {
            const newApuesta = [...apuestaBrinco];
            newApuesta[index] = null;
            setApuestaBrinco(newApuesta);
            return;
        }

        if (!isNaN(num) && num >= 0 && num <= 39) {
            const newApuesta = [...apuestaBrinco];
            newApuesta[index] = num;
            if (newApuesta.slice(0, index).includes(num)) {
                setError(`¡Ouch! Número duplicado en Brinco: ${num}. ¡Solo números únicos, por favor!`);
                return;
            }
            setApuestaBrinco(newApuesta);
            setError(null);
        } else {
            setError(`¡Ups! Ingresa un número válido (0-39) en la posición ${index + 1} del Brinco.`);
        }
    };

    const handleResultadoBrincoChange = (index, value) => {
        const num = parseInt(value, 10);

        if (value === "") {
            const newResultado = [...resultadoBrinco];
            newResultado[index] = null;
            setResultadoBrinco(newResultado);
            return;
        }
        if (!isNaN(num) && num >= 0 && num <= 39) {
            const newResultado = [...resultadoBrinco];
            newResultado[index] = num;
            if (newResultado.slice(0, index).includes(num)) {
                setError(`¡Ay caramba! Número duplicado en Resultado Brinco: ${num}. ¡Necesitamos números diferentes!`);
                return;
            }
            setResultadoBrinco(newResultado);
            setError(null);
        } else {
            setError(`¡No puede ser! Ingresa un número válido (0-39) en la posición ${index + 1} del Resultado Brinco.`);
        }
    };

    const calcularCoincidenciasQuini = useCallback(() => {
        if (apuestaQuiniCompleta && resultadoQuiniCompleta) {
            setCalcularAnimadoQuini(true);
            setTimeout(() => {
                let count = 0;
                const coincidentes = [];
                for (let i = 0; i < 6; i++) {
                    if (resultadoQuini.includes(apuestaQuini[i])) {
                        count++;
                        coincidentes.push(apuestaQuini[i]);
                    }
                }
                setCoincidenciasQuini(count);
                setNumerosCoincidentesQuini(coincidentes);
                setCalcularAnimadoQuini(false);
            }, 500); // Pequeña pausa para la animación
        } else {
            setError("¡Atención! Debes ingresar los 6 números de la apuesta y el resultado del Quini.");
            setCoincidenciasQuini(null);
            setNumerosCoincidentesQuini([]);
        }
    }, [apuestaQuini, resultadoQuini, apuestaQuiniCompleta, resultadoQuiniCompleta]);

    const calcularCoincidenciasBrinco = useCallback(() => {
        if (apuestaBrincoCompleta && resultadoBrincoCompleta) {
            setCalcularAnimadoBrinco(true);
            setTimeout(() => {
                let count = 0;
                const coincidentes = [];
                for (let i = 0; i < 6; i++) {
                    if (resultadoBrinco.includes(apuestaBrinco[i])) {
                        count++;
                        coincidentes.push(apuestaBrinco[i]);
                    }
                }
                setCoincidenciasBrinco(count);
                setNumerosCoincidentesBrinco(coincidentes);
                setCalcularAnimadoBrinco(false);
            }, 500); // Pequeña pausa para la animación
        } else {
            setError("¡Atención! Debes ingresar los 6 números de la apuesta y el resultado del Brinco.");
            setCoincidenciasBrinco(null);
            setNumerosCoincidentesBrinco([]);
        }
    }, [apuestaBrinco, resultadoBrinco, apuestaBrincoCompleta, resultadoBrincoCompleta]);

    return (
        <div className="app-container">
            <header className="retro-header">
                <h1 className="neon-text">Sorteo Quini</h1>
            </header>
            <main className="main-content retro-bg">
                <section className="input-section">
                    <div className="input-group">
                        <label className="input-label">Tus números (Quini):</label>
                        <div className="inputs-container">
                            {apuestaQuini.map((num, index) => (
                                <Input
                                    key={`apuesta-quini-${index}`}
                                    type="text"
                                    maxLength={2}
                                    placeholder={`A${index + 1}`}
                                    value={num === null ? '' : num.toString()}
                                    onChange={(e) => handleApuestaQuiniChange(index, e.target.value)}
                                    className="retro-input"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Resultado del Sorteo (Quini):</label>
                        <div className="inputs-container">
                            {resultadoQuini.map((num, index) => (
                                <Input
                                    key={`resultado-quini-${index}`}
                                    type="text"
                                    maxLength={2}
                                    placeholder={`R${index + 1}`}
                                    value={num === null ? '' : num.toString()}
                                    onChange={(e) => handleResultadoQuiniChange(index, e.target.value)}
                                    className="retro-input"
                                />
                            ))}
                        </div>
                    </div>
                </section>
                <div className="button-container">
                    <Button
                        onClick={calcularCoincidenciasQuini}
                        disabled={!apuestaQuiniCompleta || !resultadoQuiniCompleta}
                        className={`retro-button ${calcularAnimadoQuini ? 'pulse-button' : ''}`}
                    >
                        {calcularAnimadoQuini ? 'Calculando...' : '¡ Pulsar para ver Resultado Quini !'}
                    </Button>
                </div>
                {coincidenciasQuini !== null && (
                    <div className="result-message retro-text">
                        ¡Tienes <span className="highlight-text">{coincidenciasQuini}</span> números coincidentes en el Quini!
                        {numerosCoincidentesQuini.length > 0 && (
                            <p>Números coincidentes: <span className="highlight-text">{numerosCoincidentesQuini.join(', ')}</span></p>
                        )}
                    </div>
                )}
            </main>
            <h2 className="neon-text">----------------------------</h2>
            <header className="retro-header">
                <h1 className="neon-text">Sorteo Brinco</h1>
            </header>
            <main className="main-content retro-bg">
                <section className="input-section">
                    <div className="input-group">
                        <label className="input-label">Tus números (Brinco):</label>
                        <div className="inputs-container">
                            {apuestaBrinco.map((num, index) => (
                                <Input
                                    key={`apuesta-brinco-${index}`}
                                    type="text"
                                    maxLength={2}
                                    placeholder={`A${index + 1}`}
                                    value={num === null ? '' : num.toString()}
                                    onChange={(e) => handleApuestaBrincoChange(index, e.target.value)}
                                    className="retro-input"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Resultado del Sorteo (Brinco):</label>
                        <div className="inputs-container">
                            {resultadoBrinco.map((num, index) => (
                                <Input
                                    key={`resultado-brinco-${index}`}
                                    type="text"
                                    maxLength={2}
                                    placeholder={`R${index + 1}`}
                                    value={num === null ? '' : num.toString()}
                                    onChange={(e) => handleResultadoBrincoChange(index, e.target.value)}
                                    className="retro-input"
                                />
                            ))}
                        </div>
                    </div>
                </section>
                <div className="button-container">
                    <Button
                        onClick={calcularCoincidenciasBrinco}
                        disabled={!apuestaBrincoCompleta || !resultadoBrincoCompleta}
                        className={`retro-button ${calcularAnimadoBrinco ? 'pulse-button' : ''}`}
                    >
                        {calcularAnimadoBrinco ? 'Calculando...' : '¡ Pulsar para ver Resultado Brinco !'}
                    </Button>
                </div>
                {coincidenciasBrinco !== null && (
                    <div className="result-message retro-text">
                        ¡Tienes <span className="highlight-text">{coincidenciasBrinco}</span> números coincidentes en el Brinco!
                        {numerosCoincidentesBrinco.length > 0 && (
                            <p>Números coincidentes: <span className="highlight-text">{numerosCoincidentesBrinco.join(', ')}</span></p>
                        )}
                    </div>
                )}
            </main>
            {error && (
                <Alert className="alert-message retro-alert">
                    <AiOutlineWarning className="h-4 w-4 mr-2" />
                    <AlertTitle className="alert-title">¡Error, Error!</AlertTitle>
                    <AlertDescription className="alert-description">{error}</AlertDescription>
                </Alert>
            )}
            <footer className="retro-footer">
                <p>&copy; 2025 Walter Gomez - FullStack-Developer/Data Science</p>
            </footer>
        </div>
    );
};

export default App;