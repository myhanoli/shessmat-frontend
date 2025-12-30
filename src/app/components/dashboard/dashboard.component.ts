import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../model/product';

import { Subscription, debounceTime, forkJoin } from 'rxjs';

import { ProductService } from 'src/app/service/product.service';
import { LayoutService } from 'src/app/service/app.layout.service';
import { EstadisticasService } from 'src/app/service/estadisticas.service';
import { FolioService } from 'src/app/service/folio.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;
    chartData2: any;

    chartOptions: any;
    chartOptions2: any;

    pieData: any;
pieOptions: any;

topClientesBarData: any;
topClientesBarOptions: any;

foliosDashboard: any[] = [];

    subscription!: Subscription;

    totalFolios2025: number = 0;

    anio1 = 2024;
    anio2 = 2025;
    anio3 = 2026;

    rankingClientes: any[] = [];
    top10Clientes: any[] = [];

    constructor(private productService: ProductService, public layoutService: LayoutService,private estadisticasService:EstadisticasService,private folioService: FolioService ) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

        this.cargarTotalFolios2025();
         this.cargarFoliosPorMes(2025);
        this.cargarComparativa(this.anio1, this.anio2);
        // this.cargarRankingClientes();
         this.cargarTop10Clientes();

       //  this.cargarGraficaEstatus();
         this.cargarFoliosDashboard();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    cargarTotalFolios2025(): void {
  this.estadisticasService.getTotalFoliosPorAnio(2025).subscribe({
    next: (resp) => {
      this.totalFolios2025 = resp.totalFolios;
    },
    error: () => {
      console.error('Error al cargar total de folios');
    }
  });
}

cargarFoliosPorMes(anio: number): void {

  const meses = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];

  // Inicializar en 0
  const dataMeses = new Array(12).fill(0);

  this.estadisticasService.getFoliosPorMes(anio).subscribe({
    next: (resp) => {

      resp.forEach(item => {
        dataMeses[item.mes - 1] = item.total;
      });

      this.chartData2 = {
        labels: meses,
        datasets: [
          {
            label: `${anio}`,
            data: dataMeses,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4
          }
        ]
      };

      this.chartOptions2 = {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      };
    },
    error: err => console.error(err)
  });
}


cargarComparativa(anioA: number, anioB: number): void {

  const meses = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];

  const dataA = new Array(12).fill(0);
  const dataB = new Array(12).fill(0);

  // Llamadas en paralelo
  forkJoin({
    a: this.estadisticasService.getFoliosPorMes(anioA),
    b: this.estadisticasService.getFoliosPorMes(anioB)
  }).subscribe({
    next: ({ a, b }) => {

      a.forEach(item => dataA[item.mes - 1] = item.total);
      b.forEach(item => dataB[item.mes - 1] = item.total);

      this.chartData = {
        labels: meses,
        datasets: [
          {
            label: `${anioA}`,
            data: dataA,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66,165,245,0.2)',
            tension: 0.4
          },
          {
            label: `${anioB}`,
            data: dataB,
            borderColor: '#66BB6A',
            backgroundColor: 'rgba(102,187,106,0.2)',
            tension: 0.4
          }
        ]
      };

      this.chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      };
    },
    error: err => console.error(err)
  });
}


cargarRankingClientes(): void {
  this.estadisticasService.getRankingClientes().subscribe({
    next: resp => this.rankingClientes = resp,
    error: err => console.error(err)
  });
}

/*cargarTop10Clientes(): void {
  this.estadisticasService.getTop10Clientes().subscribe({
    next: resp => this.top10Clientes = resp,
    error: err => console.error(err)
  });
}*/

cargarTop10Clientes(): void {
  this.estadisticasService.getTop10Clientes().subscribe({
    next: resp => {
      this.top10Clientes = resp;
      this.cargarGraficaTopClientes();
    },
    error: err => console.error(err)
  });
}

cargarGraficaEstatus() {
  const estatusConteo: Record<string, number> = {};

  this.foliosDashboard.forEach(folio => {
    const estatus = folio.estatusActual?.nombre || 'Sin estatus';
    estatusConteo[estatus] = (estatusConteo[estatus] || 0) + 1;
  });

  this.pieData = {
    labels: Object.keys(estatusConteo),
    datasets: [
      {
        data: Object.values(estatusConteo),
        backgroundColor: [
          '#3B82F6', // RECIBIDO
          '#EAB308', // EN DIAGNOSTICO
          '#F97316', // ESPERA AUTORIZACION
          '#A855F7', // EN REPARACION
          '#22C55E', // LISTO PARA ENTREGA
          '#047857', // ENTREGADO
          '#DC2626'  // CANCELADO
        ]
      }
    ]
  };

  this.pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };
}

cargarFoliosDashboard() {
  this.folioService.getFolios().subscribe((data: any[]) => {
    this.foliosDashboard = data;
    this.cargarGraficaEstatus();
  });
}

cargarGraficaTopClientes(): void {
  const labels = this.top10Clientes.map(c => c.numCliente);
  const data = this.top10Clientes.map(c => c.totalFolios);

  this.topClientesBarData = {
    labels,
    datasets: [
      {
        label: 'Folios',
        data,
        backgroundColor: '#3B82F6',
        borderRadius: 6,
        categoryPercentage: 0.55,  // altura de cada barra
                // ancho visual de cada barra
      }
    ]
  };

  this.topClientesBarOptions = {
     
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.raw} folios`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#6B7280',
          
        },
        title: {
          display: true,
          text: 'Cantidad de folios'
        }
      },
      y: {
        ticks: {
          autoSkip: true,
       
          color: '#6B7280',
          
        }
      }
    }
  };
}


}
