document.addEventListener('DOMContentLoaded', function() {
    // Datos iniciales del simulador
    const initialData = {
        clients: [
            { id: 1, name: 'Mercado Pago', type: 'Fintech' },
            { id: 2, name: 'Banco Galicia', type: 'Banco' },
            { id: 3, name: 'Ualá', type: 'Fintech' },
            { id: 4, name: 'Santander', type: 'Banco' },
            { id: 5, name: 'Personal Pay', type: 'Fintech' },
            { id: 6, name: 'BBVA', type: 'Banco' },
            { id: 7, name: 'Brubank', type: 'Fintech' },
            { id: 8, name: 'Naranja X', type: 'Fintech' },
            { id: 9, name: 'Banco Macro', type: 'Banco' },
            { id: 10, name: 'Lemon Cash', type: 'Fintech' },
            { id: 11, name: 'Banco Provincia', type: 'Banco' },
            { id: 12, name: 'Rebanking', type: 'Fintech' },
            { id: 13, name: 'Banco Ciudad', type: 'Banco' },
            { id: 14, name: 'Belo', type: 'Fintech' },
            { id: 15, name: 'Banco Hipotecario', type: 'Banco' },
            { id: 16, name: 'Prex', type: 'Fintech' },
            { id: 17, name: 'Banco Patagonia', type: 'Banco' },
            { id: 18, name: 'Ripio', type: 'Fintech' },
            { id: 19, name: 'Banco Comafi', type: 'Banco' },
            { id: 20, name: 'Buenbit', type: 'Fintech' }
        ],
        products: [
            { id: 1, name: 'Transferencias Inmediatas Salientes', unit: 'Digital Payments', price: 1.2 },
            { id: 2, name: 'Debines Salientes', unit: 'Digital Payments', price: 0.8 },
            { id: 3, name: 'Internet Banking', unit: 'Digital Payments', price: 0.5 },
            { id: 4, name: 'Pagos con Transferencias (PCT)', unit: 'Instant Payments', price: 1.5 },
            { id: 5, name: 'Transferencias Entrantes PSPs', unit: 'Instant Payments', price: 1.0 },
            { id: 6, name: 'Transferencias Salientes PSPs', unit: 'Instant Payments', price: 1.3 },
            { id: 7, name: 'QR Crédito', unit: 'New Products', price: 2.0 },
            { id: 8, name: 'Prevención de Fraude', unit: 'New Products', price: 3.5 },
            { id: 9, name: 'Extracción con Transferencias', unit: 'New Products', price: 1.8 },
            { id: 10, name: 'Transferencias Recurrentes', unit: 'New Products', price: 1.1 },
            { id: 11, name: 'Master Send y Visa Direct', unit: 'New Products', price: 2.5 },
            { id: 12, name: 'Payouts', unit: 'New Products', price: 2.2 },
            { id: 13, name: 'Cripto', unit: 'New Products', price: 2.8 },
            { id: 14, name: 'Remesas', unit: 'New Products', price: 3.0 }
        ],
        transactions: [],
        entornoVariables: [],
        competitivoVariables: [],
        estrategias: [],
        currentYear: new Date().getFullYear(),
        costosOperativos: 32.5,
        gastosGenerales: 14.2,
        bcgData: {
            'Digital Payments': { crecimiento: 15, participacion: 25 },
            'Instant Payments': { crecimiento: 25, participacion: 40 },
            'QR Crédito': { crecimiento: 40, participacion: 10 },
            'Prevención de Fraude': { crecimiento: 5, participacion: 60 },
            'Extracción con Transferencias': { crecimiento: 8, participacion: 15 }
        }
    };

    // Generar transacciones aleatorias para cada cliente y producto
    function generateInitialTransactions() {
        const transactions = [];
        initialData.clients.forEach(client => {
            initialData.products.forEach(product => {
                const monthlyTransactions = Math.floor(Math.random() * 100000) + 10000;
                for (let month = 1; month <= 12; month++) {
                    transactions.push({
                        clientId: client.id,
                        productId: product.id,
                        month: month,
                        year: initialData.currentYear,
                        quantity: monthlyTransactions * (0.8 + Math.random() * 0.4), // Variación mensual
                        unitPrice: product.price
                    });
                }
            });
        });
        initialData.transactions = transactions;
    }

    // Calcular métricas financieras
    function calculateFinancialMetrics() {
        const metrics = {
            revenue: 0,
            costos: 0,
            gastos: 0,
            ebitda: 0,
            margen: 0,
            roi: 24,
            nps: 68,
            costoPorTransaccion: 0.38
        };

        // Calcular revenue total
        initialData.transactions.forEach(t => {
            metrics.revenue += t.quantity * t.unitPrice;
        });

        // Calcular costos y gastos
        metrics.costos = metrics.revenue * (initialData.costosOperativos / 100);
        metrics.gastos = metrics.revenue * (initialData.gastosGenerales / 100);
        metrics.ebitda = metrics.revenue - metrics.costos - metrics.gastos;
        metrics.margen = (metrics.ebitda / metrics.revenue) * 100;
        metrics.costoPorTransaccion = metrics.costos / initialData.transactions.reduce((sum, t) => sum + t.quantity, 0);

        return metrics;
    }

    // Inicializar datos
    generateInitialTransactions();
    const financialMetrics = calculateFinancialMetrics();

    // Navigation between tabs
    const tabs = {
        'dashboard-tab': 'dashboard-content',
        'pl-tab': 'pl-content',
        'entorno-tab': 'entorno-content',
        'competitivo-tab': 'competitivo-content',
        'crecimiento-tab': 'crecimiento-content',
        'estrategias-tab': 'estrategias-content',
        'kpis-tab': 'kpis-content'
    };

    Object.keys(tabs).forEach(tabId => {
        document.getElementById(tabId).addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all content divs
            Object.values(tabs).forEach(contentId => {
                document.getElementById(contentId).classList.add('d-none');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.sidebar .nav-link').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected content and mark tab as active
            document.getElementById(tabs[tabId]).classList.remove('d-none');
            this.classList.add('active');
        });
    });

    // Botones del dashboard
    document.querySelectorAll('.btn-outline-secondary, .btn-outline-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text === 'Compartir' || text.includes('Compartir')) {
                alert('Función de compartir habilitada. En una aplicación real, esto abriría opciones para compartir.');
            } else if (text === 'Exportar' || text.includes('Exportar')) {
                alert('Los datos se han exportado correctamente.');
            } else if (text === 'Actualizar' || text.includes('Actualizar')) {
                alert('Datos actualizados correctamente.');
                // En una aplicación real, aquí se recargarían los datos
            } else if (text === 'Anual' || text === 'Mensual' || text === 'Trimestral') {
                document.querySelectorAll('.btn-outline-light').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                alert(`Vista cambiada a ${text}. Los gráficos se actualizarían.`);
                // En una aplicación real, aquí se actualizarían los gráficos
            }
        });
    });

    // Initialize range sliders
    const costosOperativosSlider = document.getElementById('costos-operativos');
    const costosOperativosValue = document.getElementById('costos-operativos-value');
    const gastosGeneralesSlider = document.getElementById('gastos-generales');
    const gastosGeneralesValue = document.getElementById('gastos-generales-value');
    
    costosOperativosSlider.value = initialData.costosOperativos;
    costosOperativosValue.textContent = `${initialData.costosOperativos}%`;
    
    gastosGeneralesSlider.value = initialData.gastosGenerales;
    gastosGeneralesValue.textContent = `${initialData.gastosGenerales}%`;
    
    costosOperativosSlider.addEventListener('change', function() {
        initialData.costosOperativos = parseFloat(this.value);
        costosOperativosValue.textContent = `${this.value}%`;
        updatePLCharts();
    });

    gastosGeneralesSlider.addEventListener('change', function() {
        initialData.gastosGenerales = parseFloat(this.value);
        gastosGeneralesValue.textContent = `${this.value}%`;
        updatePLCharts();
    });

    // Impacto slider for entorno analysis
    const impactoSlider = document.getElementById('entorno-impacto');
    const impactoValue = document.getElementById('impacto-value');
    
    impactoSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        impactoValue.textContent = `${value} - ${getImpactLevel(value)}`;
        impactoValue.className = `badge bg-${getImpactBadgeClass(value)}`;
    });

    // Intensidad slider for competitive analysis
    const intensidadSlider = document.getElementById('competitivo-intensidad');
    const intensidadValue = document.getElementById('intensidad-value');
    
    intensidadSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        intensidadValue.textContent = `${value} - ${getIntensityLevel(value)}`;
        intensidadValue.className = `badge bg-${getImpactBadgeClass(value)}`;
    });

    function getImpactLevel(value) {
        switch(value) {
            case 1: return 'Muy bajo';
            case 2: return 'Bajo';
            case 3: return 'Medio';
            case 4: return 'Alto';
            case 5: return 'Muy alto';
            default: return 'Medio';
        }
    }

    function getIntensityLevel(value) {
        switch(value) {
            case 1: return 'Muy baja';
            case 2: return 'Baja';
            case 3: return 'Media';
            case 4: return 'Alta';
            case 5: return 'Muy alta';
            default: return 'Media';
        }
    }

    function getImpactBadgeClass(value) {
        switch(value) {
            case 1: return 'success';
            case 2: return 'success';
            case 3: return 'warning';
            case 4: return 'danger';
            case 5: return 'danger';
            default: return 'secondary';
        }
    }

    // Form submissions
    document.getElementById('pl-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const ajusteAutomatico = document.getElementById('ajuste-automatico').checked;
        if (ajusteAutomatico) {
            // Simular optimización basada en histórico
            initialData.costosOperativos = 30.0;
            initialData.gastosGenerales = 12.5;
            costosOperativosSlider.value = initialData.costosOperativos;
            costosOperativosValue.textContent = `${initialData.costosOperativos}%`;
            gastosGeneralesSlider.value = initialData.gastosGenerales;
            gastosGeneralesValue.textContent = `${initialData.gastosGenerales}%`;
            alert('Configuración optimizada basada en histórico');
        } else {
            alert('Configuración de P&L actualizada correctamente');
        }
        updatePLCharts();
    });

    document.getElementById('bcg-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const unidad = document.getElementById('bcg-unidad').value;
        const crecimiento = parseFloat(document.getElementById('bcg-crecimiento').value);
        const participacion = parseFloat(document.getElementById('bcg-participacion').value);
        
        initialData.bcgData[unidad] = { crecimiento, participacion };
        updateBCGMatrix();
    });

    document.getElementById('estrategia-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const tipo = document.getElementById('estrategia-tipo').value;
        const unidad = document.getElementById('estrategia-unidad').value;
        const producto = document.getElementById('estrategia-producto').value;
        const inversion = parseFloat(document.getElementById('estrategia-inversion').value);
        const duracion = parseInt(document.getElementById('estrategia-duracion').value);
        const crecimiento = parseFloat(document.getElementById('estrategia-crecimiento').value);
        
        const estrategia = {
            id: Date.now(),
            tipo,
            unidad,
            producto,
            inversion,
            duracion,
            crecimiento,
            fecha: new Date().toISOString().split('T')[0],
            estado: 'En curso'
        };
        
        initialData.estrategias.push(estrategia);
        updateEstrategiasTable();
        alert('Estrategia simulada correctamente. Revise el impacto estimado en la tabla.');
    });

    // Botones de entorno
    document.querySelector('#entorno-content .btn-outline-primary').addEventListener('click', function() {
        const categoria = document.getElementById('entorno-categoria').value;
        const variable = document.getElementById('entorno-variable').options[document.getElementById('entorno-variable').selectedIndex].text;
        const impacto = parseInt(document.getElementById('entorno-impacto').value);
        
        const variableObj = {
            id: Date.now(),
            categoria,
            variable,
            impacto,
            fecha: new Date().toISOString().split('T')[0]
        };
        
        initialData.entornoVariables.push(variableObj);
        updateEntornoVariablesList();
        updateEntornoRadarChart();
    });

    document.querySelector('#entorno-content .btn-outline-secondary').addEventListener('click', function() {
        alert('Mostrando histórico de variables de entorno');
    });

    // Botones competitivo
    document.querySelector('#competitivo-content .btn-outline-primary').addEventListener('click', function() {
        const fuerza = document.getElementById('competitivo-fuerza').value;
        const variable = document.getElementById('competitivo-variable').options[document.getElementById('competitivo-variable').selectedIndex].text;
        const intensidad = parseInt(document.getElementById('competitivo-intensidad').value);
        
        const variableObj = {
            id: Date.now(),
            fuerza,
            variable,
            intensidad,
            fecha: new Date().toISOString().split('T')[0]
        };
        
        initialData.competitivoVariables.push(variableObj);
        updateCompetitivoVariablesList();
        updateCompetitivoRadarChart();
    });

    document.querySelector('#competitivo-content .btn-outline-secondary').addEventListener('click', function() {
        alert('Mostrando histórico de variables competitivas');
    });

    // Botones de crecimiento
    document.querySelector('#crecimiento-content .btn-outline-primary').addEventListener('click', function() {
        alert('Generando estrategias de crecimiento sugeridas');
        // En una aplicación real, aquí se generarían estrategias basadas en la matriz BCG
    });

    // Botones de estrategias
    document.querySelector('#estrategias-content .btn-outline-primary').addEventListener('click', function() {
        alert('Preparando nueva simulación de estrategia');
    });

    document.querySelector('#estrategias-content .btn-outline-secondary').addEventListener('click', function() {
        alert('Mostrando histórico de estrategias');
    });

    // Botones de KPIs
    document.querySelectorAll('#kpis-content .btn-outline-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            document.querySelectorAll('#kpis-content .btn-outline-secondary').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            alert(`Vista de KPIs cambiada a ${text}. Los gráficos se actualizarían.`);
            // En una aplicación real, aquí se actualizarían los gráficos según el período
        });
    });

    // Funciones de actualización
    function updatePLCharts() {
        const metrics = calculateFinancialMetrics();
        updatePLTable();
        updateRevenueByUnitChart(metrics);
        updateTransactionsCharts();
    }
    function updateEntornoVariablesList() {
        const listContainer = document.querySelector('#entorno-content .list-group');
        listContainer.innerHTML = '';
        
        initialData.entornoVariables.forEach(variable => {
            const item = document.createElement('div');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                <div>
                    <small class="text-muted">${variable.categoria}</small>
                    <div>${variable.variable}</div>
                </div>
                <div>
                    <span class="impact-${variable.impacto >= 4 ? 'high' : variable.impacto <= 2 ? 'low' : 'medium'}">${variable.impacto} - ${getImpactLevel(variable.impacto)}</span>
                    <button class="btn btn-sm btn-link text-danger delete-entorno-variable" data-id="${variable.id}"><i class="fas fa-times"></i></button>
                </div>
            `;
            listContainer.appendChild(item);
        });

        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.delete-entorno-variable').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                initialData.entornoVariables = initialData.entornoVariables.filter(v => v.id !== id);
                updateEntornoVariablesList();
                updateEntornoRadarChart();
            });
        });
    }

    function updateCompetitivoVariablesList() {
        const listContainer = document.querySelector('#competitivo-content .list-group');
        listContainer.innerHTML = '';
        
        initialData.competitivoVariables.forEach(variable => {
            const item = document.createElement('div');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                <div>
                    <small class="text-muted">${variable.fuerza}</small>
                    <div>${variable.variable}</div>
                </div>
                <div>
                    <span class="impact-${variable.intensidad >= 4 ? 'high' : variable.intensidad <= 2 ? 'low' : 'medium'}">${variable.intensidad} - ${getIntensityLevel(variable.intensidad)}</span>
                    <button class="btn btn-sm btn-link text-danger delete-competitivo-variable" data-id="${variable.id}"><i class="fas fa-times"></i></button>
                </div>
            `;
            listContainer.appendChild(item);
        });

        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.delete-competitivo-variable').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                initialData.competitivoVariables = initialData.competitivoVariables.filter(v => v.id !== id);
                updateCompetitivoVariablesList();
                updateCompetitivoRadarChart();
            });
        });
    }

    function updateEstrategiasTable() {
        const tableBody = document.querySelector('#estrategias-content tbody');
        tableBody.innerHTML = '';
        
        initialData.estrategias.forEach(estrategia => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${estrategia.tipo}</td>
                <td>${estrategia.fecha}</td>
                <td>$${estrategia.inversion.toLocaleString()}</td>
                <td class="text-success">${Math.floor(Math.random() * 20) + 15}%</td>
                <td class="text-success">+$${Math.floor(estrategia.inversion * 0.3).toLocaleString()}</td>
                <td><span class="badge bg-success">${estrategia.estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary"><i class="fas fa-chart-line"></i></button>
                    <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-edit"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Initialize charts
    initializeCharts();

    // Funciones para inicializar gráficos
    function initializeCharts() {
        // Financial Summary Chart
        const financialCtx = document.getElementById('financialChart').getContext('2d');
        window.financialChart = new Chart(financialCtx, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [1450200, 1520500, 1610800, 1580300, 1620400, 1680500, 1720600, 1750700, 1800800, 1850900, 1901000, 1951100],
                        backgroundColor: 'rgba(52, 152, 219, 0.7)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'EBITDA',
                        data: [619700, 654600, 699500, 685400, 702300, 728400, 745500, 759600, 782700, 805800, 828900, 852000],
                        backgroundColor: 'rgba(46, 204, 113, 0.7)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.raw.toLocaleString();
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // Business Unit Distribution Chart
        const businessUnitCtx = document.getElementById('businessUnitChart').getContext('2d');
        window.businessUnitChart = new Chart(businessUnitCtx, {
            type: 'doughnut',
            data: {
                labels: ['Digital Payments', 'Instant Payments'],
                datasets: [{
                    data: [65, 35],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(231, 76, 60, 0.7)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(231, 76, 60, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Revenue by Unit Chart
        const revenueByUnitCtx = document.getElementById('revenueByUnitChart').getContext('2d');
        window.revenueByUnitChart = new Chart(revenueByUnitCtx, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar'],
                datasets: [
                    {
                        label: 'Digital Payments',
                        data: [942630, 988200, 1047020],
                        backgroundColor: 'rgba(52, 152, 219, 0.7)'
                    },
                    {
                        label: 'Instant Payments',
                        data: [507570, 532300, 563780],
                        backgroundColor: 'rgba(231, 76, 60, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toLocaleString() + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.raw.toLocaleString();
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // Digital Transactions Chart
        const digitalTransactionsCtx = document.getElementById('digitalTransactionsChart').getContext('2d');
        window.digitalTransactionsChart = new Chart(digitalTransactionsCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar'],
                datasets: [{
                    label: 'Transferencias Inmediatas Salientes',
                    data: [520000, 545000, 578000],
                    borderColor: 'rgba(52, 152, 219, 1)',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Debines Salientes',
                    data: [320000, 335000, 355000],
                    borderColor: 'rgba(155, 89, 182, 1)',
                    backgroundColor: 'rgba(155, 89, 182, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Internet Banking',
                    data: [280000, 295000, 312000],
                    borderColor: 'rgba(46, 204, 113, 1)',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return (value / 1000).toLocaleString() + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.raw.toLocaleString();
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // Instant Transactions Chart
        const instantTransactionsCtx = document.getElementById('instantTransactionsChart').getContext('2d');
        window.instantTransactionsChart = new Chart(instantTransactionsCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar'],
                datasets: [{
                    label: 'Pagos con Transferencias (PCT)',
                    data: [320000, 335000, 355000],
                    borderColor: 'rgba(231, 76, 60, 1)',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Transferencias Entrantes PSPs',
                    data: [180000, 190000, 201000],
                    borderColor: 'rgba(241, 196, 15, 1)',
                    backgroundColor: 'rgba(241, 196, 15, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Transferencias Salientes PSPs',
                    data: [150000, 158000, 167000],
                    borderColor: 'rgba(230, 126, 34, 1)',
                    backgroundColor: 'rgba(230, 126, 34, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return (value / 1000).toLocaleString() + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.raw.toLocaleString();
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // Entorno Radar Chart
        const entornoRadarCtx = document.getElementById('entornoRadarChart').getContext('2d');
        window.entornoRadarChart = new Chart(entornoRadarCtx, {
            type: 'radar',
            data: {
                labels: ['Político', 'Económico', 'Social', 'Tecnológico', 'Ecológico', 'Legal'],
                datasets: [{
                    label: 'Impacto Actual',
                    data: [4, 3, 2, 3, 1, 4],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)'
                },
                {
                    label: 'Impacto Promedio Industria',
                    data: [3, 3, 3, 4, 2, 3],
                    backgroundColor: 'rgba(155, 89, 182, 0.2)',
                    borderColor: 'rgba(155, 89, 182, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(155, 89, 182, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                }
            }
        });

        // Competitivo Radar Chart
        const competitivoRadarCtx = document.getElementById('competitivoRadarChart').getContext('2d');
        window.competitivoRadarChart = new Chart(competitivoRadarCtx, {
            type: 'radar',
            data: {
                labels: ['Competencia', 'Nuevos Entrantes', 'Sustitutos', 'Proveedores', 'Clientes'],
                datasets: [{
                    label: 'Intensidad Actual',
                    data: [5, 2, 3, 3, 4],
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(231, 76, 60, 1)'
                },
                {
                    label: 'Intensidad Promedio',
                    data: [4, 3, 3, 3, 3],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                }
            }
        });

        // BCG Matrix Chart
        const bcgMatrixCtx = document.getElementById('bcgMatrixChart').getContext('2d');
        window.bcgMatrixChart = new Chart(bcgMatrixCtx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Digital Payments',
                        data: [{x: 15, y: 25}],
                        backgroundColor: 'rgba(52, 152, 219, 1)',
                        pointRadius: 15
                    },
                    {
                        label: 'Instant Payments',
                        data: [{x: 25, y: 40}],
                        backgroundColor: 'rgba(231, 76, 60, 1)',
                        pointRadius: 15
                    },
                    {
                        label: 'QR Crédito',
                        data: [{x: 40, y: 10}],
                        backgroundColor: 'rgba(46, 204, 113, 1)',
                        pointRadius: 15
                    },
                    {
                        label: 'Prevención de Fraude',
                        data: [{x: 5, y: 60}],
                        backgroundColor: 'rgba(241, 196, 15, 1)',
                        pointRadius: 15
                    },
                    {
                        label: 'Extracción con Transferencias',
                        data: [{x: 8, y: 15}],
                        backgroundColor: 'rgba(155, 89, 182, 1)',
                        pointRadius: 15
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Crecimiento de Mercado (%)'
                        },
                        min: 0,
                        max: 50
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Participación de Mercado (%)'
                        },
                        min: 0,
                        max: 70
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.x}% Crecimiento, ${context.parsed.y}% Participación`;
                            }
                        }
                    }
                }
            }
        });

        // KPI Trend Chart
        const kpiTrendCtx = document.getElementById('kpiTrendChart').getContext('2d');
        window.kpiTrendChart = new Chart(kpiTrendCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [
                    {
                        label: 'EBITDA ($)',
                        data: [619700, 654600, 699500, 685400, 702300, 728400, 745500, 759600, 782700, 805800, 828900, 852000],
                        borderColor: 'rgba(46, 204, 113, 1)',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        tension: 0.3,
                        yAxisID: 'y'
                    },
                    {
                        label: 'ROI (%)',
                        data: [18, 19, 20, 21, 22, 23, 22, 23, 24, 24, 24, 24],
                        borderColor: 'rgba(52, 152, 219, 1)',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.3,
                        yAxisID: 'y1'
                    },
                    {
                        label: 'NPS',
                        data: [58, 60, 62, 63, 64, 65, 66, 66, 67, 67, 68, 68],
                        borderColor: 'rgba(155, 89, 182, 1)',
                        backgroundColor: 'rgba(155, 89, 182, 0.1)',
                        tension: 0.3,
                        yAxisID: 'y2'
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'EBITDA ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toLocaleString() + 'K';
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'ROI (%)'
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        min: 0,
                        max: 30
                    },
                    y2: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'NPS'
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        min: 0,
                        max: 100
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.dataset.label === 'EBITDA ($)') {
                                    label += '$' + context.raw.toLocaleString();
                                } else {
                                    label += context.raw;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // Efficiency Chart
        const efficiencyCtx = document.getElementById('efficiencyChart').getContext('2d');
        window.efficiencyChart = new Chart(efficiencyCtx, {
            type: 'bar',
            data: {
                labels: ['Transferencias Inmediatas', 'Debines', 'PCT', 'Transferencias PSPs', 'Internet Banking'],
                datasets: [{
                    label: 'Eficiencia Operativa (%)',
                    data: [95, 92, 89, 91, 94],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(155, 89, 182, 0.7)',
                        'rgba(231, 76, 60, 0.7)',
                        'rgba(241, 196, 15, 0.7)',
                        'rgba(46, 204, 113, 0.7)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(231, 76, 60, 1)',
                        'rgba(241, 196, 15, 1)',
                        'rgba(46, 204, 113, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    function updateBCGMatrix() {
        const crecimiento = parseFloat(document.getElementById('bcg-crecimiento').value);
        const participacion = parseFloat(document.getElementById('bcg-participacion').value);
        const unidad = document.getElementById('bcg-unidad').value;
        
        // Actualizar datos
        initialData.bcgData[unidad] = { crecimiento, participacion };
        
        // Actualizar gráfico
        const datasets = window.bcgMatrixChart.data.datasets;
        const index = datasets.findIndex(d => d.label === unidad);
        if (index !== -1) {
            datasets[index].data = [{x: crecimiento, y: participacion}];
            window.bcgMatrixChart.update();
        }
        
        // Mostrar notificación
        const toast = document.createElement('div');
        toast.className = 'position-fixed bottom-0 end-0 p-3';
        toast.innerHTML = `
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-primary text-white">
                    <strong class="me-auto">Matriz BCG</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Matriz actualizada para ${unidad} con ${crecimiento}% crecimiento y ${participacion}% participación.
                </div>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    function updatePLTable() {
        const metrics = calculateFinancialMetrics();
        const tableBody = document.querySelector('#pl-content tbody');
    
        tableBody.innerHTML = `
            <tr>
                <td><strong>Revenue Bruto</strong></td>
                <td>$${(metrics.revenue / 12 * 1.0).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.revenue / 12 * 1.05).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.revenue / 12 * 1.1).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${metrics.revenue.toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td class="text-success">+15%</td>
            </tr>
            <tr>
                <td>Costos Operativos</td>
                <td>$${(metrics.costos / 12 * 0.95).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.costos / 12 * 1.0).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.costos / 12 * 1.05).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${metrics.costos.toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td class="text-danger">+8%</td>
            </tr>
            <tr>
                <td>Gastos Generales</td>
                <td>$${(metrics.gastos / 12 * 0.98).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.gastos / 12 * 1.0).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.gastos / 12 * 1.02).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${metrics.gastos.toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td class="text-success">+3%</td>
            </tr>
            <tr class="table-active">
                <td><strong>EBITDA</strong></td>
                <td>$${(metrics.ebitda / 12 * 0.9).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.ebitda / 12 * 1.0).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.ebitda / 12 * 1.1).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${metrics.ebitda.toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td class="text-success">+22%</td>
            </tr>
            <tr>
                <td>Margen EBITDA</td>
                <td>${(metrics.margen * 0.98).toFixed(1)}%</td>
                <td>${metrics.margen.toFixed(1)}%</td>
                <td>${(metrics.margen * 1.02).toFixed(1)}%</td>
                <td>${metrics.margen.toFixed(1)}%</td>
                <td class="text-success">+2.5pp</td>
            </tr>
        `;
    }    
    function updateEntornoRadarChart() {
        // Calcular promedios por categoría
        const categories = ['Político', 'Económico', 'Social', 'Tecnológico', 'Ecológico', 'Legal'];
        const averages = categories.map(cat => {
            const vars = initialData.entornoVariables.filter(v => v.categoria.toLowerCase() === cat.toLowerCase());
            if (vars.length === 0) return 3; // Valor por defecto si no hay variables
            return vars.reduce((sum, v) => sum + v.impacto, 0) / vars.length;
        });
        
        // Actualizar gráfico
        window.entornoRadarChart.data.datasets[0].data = averages;
        window.entornoRadarChart.update();
    }

    function updateCompetitivoRadarChart() {
        // Calcular promedios por fuerza
        const forces = ['Competencia', 'Nuevos Entrantes', 'Sustitutos', 'Proveedores', 'Clientes'];
        const averages = forces.map(force => {
            const vars = initialData.competitivoVariables.filter(v => v.fuerza.toLowerCase() === force.toLowerCase().replace(' ', ''));
            if (vars.length === 0) return 3; // Valor por defecto si no hay variables
            return vars.reduce((sum, v) => sum + v.intensidad, 0) / vars.length;
        });
        
        // Actualizar gráfico
        window.competitivoRadarChart.data.datasets[0].data = averages;
        window.competitivoRadarChart.update();
    }

    // Inicializar variables de entorno y competitivo con algunos datos de ejemplo
    initialData.entornoVariables = [
        { id: 1, categoria: 'Político', variable: 'Influencia gubernamental', impacto: 5, fecha: '2023-01-15' },
        { id: 2, categoria: 'Tecnológico', variable: 'IoT - Pagos M2M', impacto: 3, fecha: '2023-02-20' },
        { id: 3, categoria: 'Legal', variable: 'Nuevas normativas de licencias', impacto: 4, fecha: '2023-03-10' },
        { id: 4, categoria: 'Económico', variable: 'Formalización de la economía', impacto: 2, fecha: '2023-01-25' }
    ];

    initialData.competitivoVariables = [
        { id: 1, fuerza: 'Competencia', variable: 'Link', intensidad: 5, fecha: '2023-01-18' },
        { id: 2, fuerza: 'Sustitutos', variable: 'Crypto', intensidad: 3, fecha: '2023-02-22' },
        { id: 3, fuerza: 'Clientes', variable: 'Meli volumen', intensidad: 4, fecha: '2023-03-05' },
        { id: 4, fuerza: 'Nuevos Entrantes', variable: 'Digitalización del sector', intensidad: 2, fecha: '2023-01-30' }
    ];

    // Inicializar listas y gráficos
    updateEntornoVariablesList();
    updateCompetitivoVariablesList();
    updateEntornoRadarChart();
    updateCompetitivoRadarChart();
});