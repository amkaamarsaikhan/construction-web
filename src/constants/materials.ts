export interface Material {
    name: string;
    unit: string;
    defaultPrice: number; // Price in MNT
}

export const MATERIALS: Record<string, Material> = {
    cement: { name: 'Цемент (уут)', unit: 'уут', defaultPrice: 15000 },
    sand: { name: 'Элс (м3)', unit: 'м3', defaultPrice: 45000 },
    brick: { name: 'Тоосго (ш)', unit: 'ш', defaultPrice: 650 },
    block: { name: 'Хөнгөн блок (ш)', unit: 'ш', defaultPrice: 6500 },
    lumber: { name: 'Зүсмэл мод (м3)', unit: 'м3', defaultPrice: 850000 },
    log: { name: 'Дүнз (м3)', unit: 'м3', defaultPrice: 950000 },
    insulation: { name: 'Дулаалга (м3)', unit: 'м3', defaultPrice: 180000 },
    rebar: { name: 'Арматур (тн)', unit: 'тн', defaultPrice: 2800000 },
    osb: { name: 'OSB тавцан (ш)', unit: 'ш', defaultPrice: 55000 },
    sealant: { name: 'Чигжээс (кг)', unit: 'кг', defaultPrice: 12000 },
    labor_brick: { name: 'Өрлөгийн ажил (м3)', unit: 'м3', defaultPrice: 150000 },
    labor_block: { name: 'Блок өрөх ажил (м2)', unit: 'м2', defaultPrice: 15000 },
    labor_frame: { name: 'Каркас угсралт (м2)', unit: 'м2', defaultPrice: 25000 },
    labor_log: { name: 'Дүнзэн хана угсралт (м3)', unit: 'м3', defaultPrice: 200000 },
    window_2ly: { name: '2 давхар вакум цонх (м2)', unit: 'м2', defaultPrice: 280000 },
    window_3ly: { name: '3 давхар вакум цонх (м2)', unit: 'м2', defaultPrice: 420000 },
    door_interior: { name: 'Дотор хаалга (м2)', unit: 'м2', defaultPrice: 250000 },
    door_exterior: { name: 'Гадна хаалга (м2)', unit: 'м2', defaultPrice: 650000 },
    plaster_mat: { name: 'Гадна шавардлагын материал (м2)', unit: 'м2', defaultPrice: 8000 },
    labor_plaster: { name: 'Гадна шавардлагын ажил (м2)', unit: 'м2', defaultPrice: 12000 },
    insulation_eps_10: { name: 'Хөөсөнцөр дулаалга 10см (м2)', unit: 'м2', defaultPrice: 18000 },
    insulation_eps_15: { name: 'Хөөсөнцөр дулаалга 15см (м2)', unit: 'м2', defaultPrice: 26000 },
    insulation_min_10: { name: 'Минвата дулаалга 10см (м2)', unit: 'м2', defaultPrice: 38000 },
    insulation_min_15: { name: 'Минвата дулаалга 15см (м2)', unit: 'м2', defaultPrice: 55000 },
    labor_insulation: { name: 'Дулаалга наах ажил (м2)', unit: 'м2', defaultPrice: 12000 },
    // New Items
    labor_window_install: { name: 'Цонх суурилуулах ажил (ш)', unit: 'ш', defaultPrice: 45000 },
    labor_door_install: { name: 'Хаалга суурилуулах ажил (ш)', unit: 'ш', defaultPrice: 65000 },
    roof_metal: { name: 'Дээври төмөр (м2)', unit: 'м2', defaultPrice: 28000 },
    labor_roof: { name: 'Дээвэр угсралтын ажил (м2)', unit: 'м2', defaultPrice: 35000 },
    foundation_concrete: { name: 'Суурийн бетон (м3)', unit: 'м3', defaultPrice: 260000 },
    labor_foundation: { name: 'Суурийн ажил (м3)', unit: 'м3', defaultPrice: 120000 },
};
