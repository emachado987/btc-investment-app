import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Repeat, Store, ShieldCheck, AlertTriangle, Calendar, ChevronRight } from 'lucide-react';

const Analysis = () => {
    const sections = [
        {
            title: "¿Por qué Bitcoin?",
            icon: <TrendingUp className="text-primary" size={24} />,
            content: "Bitcoin se ha consolidado como el 'oro digital'. A diferencia del dinero fiat (Euros, Dólares), su suministro es limitado a 21 millones de monedas. Esto lo convierte en una potente reserva de valor a largo plazo, especialmente atractiva en tiempos de alta inflación e incertidumbre económica.",
            color: "var(--primary-color)"
        },
        {
            title: "Estrategia: DCA",
            icon: <Repeat className="text-success" size={24} />,
            content: "Para principiantes, la mejor estrategia es el Dollar Cost Averaging (DCA). Consiste en invertir una cantidad fija (ej. 50€) periódicamente (semanal o mensual) sin importar el precio. Esto promedia tu coste de entrada, reduce el estrés emocional y evita el riesgo de intentar 'adivinar' el mercado.",
            color: "var(--success-color)"
        },
        {
            title: "Exchanges Seguros",
            icon: <Store className="text-secondary" size={24} />,
            content: "Usa solo plataformas reguladas y con alta reputación. Coinbase es ideal por su facilidad de uso. Kraken destaca por su seguridad y soporte. Binance ofrece las comisiones más bajas pero una interfaz más compleja. Evita plataformas desconocidas o que prometan retornos garantizados.",
            color: "var(--secondary-color)"
        },
        {
            title: "Seguridad Vital",
            icon: <ShieldCheck className="text-primary" size={24} />,
            content: "'Not your keys, not your coins'. Si dejas tu dinero en el exchange, no es tuyo. Para cantidades pequeñas, usa Hot Wallets como Exodus. Para inversiones serias (>1000€), es OBLIGATORIO usar una Cold Wallet (Trezor, Ledger) que mantiene tus claves fuera de internet.",
            color: "var(--primary-color)"
        },
        {
            title: "Riesgos Reales",
            icon: <AlertTriangle className="text-danger" size={24} />,
            content: "Bitcoin es extremadamente volátil; caídas del 30-50% son normales. Regla de oro: Solo invierte dinero que no necesites en los próximos 4 años. Además, la seguridad es tu responsabilidad: si pierdes tu frase semilla, pierdes tu dinero para siempre sin posibilidad de recuperación.",
            color: "var(--danger-color)"
        },
        {
            title: "Expectativas 2025",
            icon: <Calendar className="text-warning" size={24} />,
            content: "El mercado sigue ciclos de 4 años marcados por el Halving. 2025 se proyecta como un año alcista post-halving, pero con alta volatilidad. Se espera que la adopción institucional (ETFs) reduzca la volatilidad a largo plazo, pero a corto plazo sigue siendo un activo de riesgo.",
            color: "var(--warning-color)"
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="analysis-page">
            <header style={{ marginBottom: '2rem' }}>
                <h2 className="text-gradient">Análisis de Inversión</h2>
                <p>Guía esencial para empezar en Bitcoin de forma segura.</p>
            </header>

            <motion.div
                className="grid-container"
                variants={container}
                initial="hidden"
                animate="show"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}
            >
                {sections.map((section, index) => (
                    <motion.div key={index} variants={item} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <div style={{
                                padding: '10px',
                                borderRadius: '12px',
                                background: `rgba(255, 255, 255, 0.05)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {section.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{section.title}</h3>
                        </div>
                        <p style={{ lineHeight: '1.6', flex: 1 }}>{section.content}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Analysis;
