const MASTER_KEY = 'master_data_v1';

const defaultMaster = {
  phongBan: ["Kế toán","Kinh doanh","Nhân sự","Kỹ thuật"],
  chucVu: ["Nhân viên","Trưởng nhóm","Trưởng phòng"],
  trinhDo: ["Trung cấp","Cao đẳng","Đại học"],
  chuyenMon: ["CNTT","Kế toán","Quản trị"],
  bangCap: ["Cử nhân","Kỹ sư","Thạc sĩ"]
};

const Data = {
  _load(){
    try {
      const raw = localStorage.getItem(MASTER_KEY);
      if(!raw){ localStorage.setItem(MASTER_KEY, JSON.stringify(defaultMaster)); return JSON.parse(JSON.stringify(defaultMaster)); }
      return JSON.parse(raw);
    } catch(e){ return JSON.parse(JSON.stringify(defaultMaster)); }
  },
  getAll(){ return this._load(); },
  saveAll(obj){ localStorage.setItem(MASTER_KEY, JSON.stringify(obj)); },
  addTo(key, value){
    if(!value) return;
    const m = this._load();
    m[key] = m[key] || [];
    if(!m[key].includes(value)) m[key].push(value);
    this.saveAll(m);
  },
  removeFrom(key, value){
    const m = this._load();
    if(!m[key]) return;
    m[key] = m[key].filter(x=> x !== value);
    this.saveAll(m);
  }
};
