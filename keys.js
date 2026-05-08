/* =========================================================
   keys.js — UCHIHA • One-Device Key System (VIP) — v2.2 (patched)
   - Plain key:   "VIP-7D-ABC": { plan:{days:7},  note:"VIP 7 ngày" }
   - Monthly key: "VIP-1M-XYZ": { plan:{months:1}, note:"VIP 1 tháng" }
   - Hashed key:  "sha256:<HEX>": { plan:{days:30}, note:"VIP băm 30 ngày" }
   - Absolute exp (override):    { exp:"2026-12-31T23:59:59Z" }

   Tính năng:
   ✅ Bind 1 thiết bị (fingerprint)
   ✅ Khoá nếu dùng trên thiết bị khác
   ✅ Khoá khi nhập sai ≥ 5 lần
   ✅ Hạn theo ngày/tháng hoặc exp tuyệt đối
   ✅ Hỗ trợ key băm sha256
   ✅ Zalo “Gia hạn”
   ✅ Khi hết hạn → lock vĩnh viễn (expired_lock) ⇒ nhập lại cũng không vào được
========================================================= */
(function () {
  const ZALO_RENEW_URL = "https://zalo.me/0369008617"; // TODO: đổi sang Zalo của bạn

  // ====== DANH MỤC KEY ======
  // Bạn có thể trộn key thường, key băm, key exp tuyệt đối
  window.UCHIHA_KEYS = {
    // Ví dụ sẵn có
    "AnhBinh-Dzai": { plan:{days:0},  note:"VIP 1 Ngày" },
    "anhbinhdz": { plan:{day:1}, note:"DEMO TEST" },

    /* ====== 100 key AnhBinh-XXXXXX (6 chữ) — VIP 30 ngày ====== */
    "AnhBinh-1": { plan:{days:1}, note:"VIP 1 ngày" },
    "AnhBinh-2": { plan:{days:1}, note:"VIP 1 ngày" },
    "AnhBinh-3": { plan:{days:1}, note:"VIP 1 ngày" },
    "AnhBinh-VNYWQE": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-KDGPSM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-RTEJAL": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-BZQYNP": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-MLCXVD": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-PWKJUF": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-STHNQG": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-AYXKRM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-UQZJTN": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-NVRLQX": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-GMWPCK": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-DEYHRT": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-LBSQVF": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-TCKZMN": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-FJQWPA": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-RYVNDK": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-ZAMTLH": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-WQJXPR": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-HCNVBL": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-KXRTEM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-PJLYQU": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-MZKHSD": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-VQBNLC": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-TXFZRA": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-GPRKJW": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-SLDQNM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-YHBWKT": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-CDPXVR": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-AKQJTM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-NBWFQL": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-UZMRHP": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-JLYCNS": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-QHWZEK": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-RMPVJA": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-DQSYHL": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-FZKXUT": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-WNVQBR": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-HTPZCM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-KJRWDX": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-LQVBSA": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-MPDZNT": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-SFRQWA": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-YZTKPL": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-VBNQMC": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-CTXJRH": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-GKDZPW": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-PJNQUX": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-RMCHTY": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-WZALQK": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-HNYXVB": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-KTPQSD": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-LWRMJC": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-QZKTVA": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-AHFQZN": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-UYPCMR": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-DLMRTX": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-SJBQKW": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-YQNRHZ": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-VCTKLM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-GXBQJP": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-NDKRWF": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-PJQHZA": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-RTFKLM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-WCMQPX": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-HZBTRN": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-KQXVDJ": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-LNYQSA": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-MQKZPT": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-SYJQLM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-YVNRQC": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-VJXKTD": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-CGLQMP": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-GQZHTN": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-NMLQRS": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-PDXQJW": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-RJTYKM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-WQBNZR": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-HBKQMP": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-KZLQTN": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-LCPRMX": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-MQXJRD": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-SZKQTM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-YJRPWL": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-VQKZHN": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-CTMQLP": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-GZPRKM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-NDWQXL": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-PBKQZS": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-RMLTXQ": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-WZXPRN": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-HHNQKM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-KTRQXM": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-LZQPMN": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-MCRQTL": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-STZQPN": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-YKQMRL": { plan:{days:30}, note:"VIP 30 ngày" },
    "AnhBinh-VBPQXN": { plan:{days:30}, note:"VIP 30 ngày" }
  };

  // ====== STORAGE ======
  const STORE_BIND   = "uchiha_bindings_v2";    // { keyId:{ fp, start, exp, locked?, reason?, lockAt? } }
  const STORE_FAILS  = "uchiha_fail_counts_v2"; // { keyId:number }
  const FAIL_LIMIT   = 5;

  // ====== UTILS ======
  const now = () => Date.now();
  const load = (k, fb) => { try{ return JSON.parse(localStorage.getItem(k) || JSON.stringify(fb)); }catch{ return fb; } };
  const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const toKeyId = (s) => s.trim();
  function parsePlanStart(startISO, plan){
    const d = new Date(startISO);
    if (plan?.days)   d.setDate(d.getDate() + Number(plan.days||0));
    if (plan?.months) d.setMonth(d.getMonth() + Number(plan.months||0));
    return d.getTime();
  }
  async function sha256Hex(str){
    const enc = new TextEncoder().encode(str);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");
  }
  function getFingerprint(){
    const parts = [
      navigator.userAgent,
      navigator.language,
      screen.width+"x"+screen.height+"@"+(window.devicePixelRatio||1),
      navigator.hardwareConcurrency||0,
      Intl.DateTimeFormat().resolvedOptions().timeZone||""
    ];
    return btoa(parts.join("|"));
  }

  // ====== CORE API ======
  const API = {
    renewUrl(){ return ZALO_RENEW_URL; },

    /** Xác thực key + bind 1 thiết bị; hết hạn → lock vĩnh viễn */
    async verifyKey(inputKey){
      const keyRaw = inputKey.trim();
      if(!keyRaw) return { ok:false, msg:"Hãy nhập key." };

      // tra meta
      let meta = window.UCHIHA_KEYS[keyRaw];
      if(!meta){
        const hx = await sha256Hex(keyRaw);
        for(const k in window.UCHIHA_KEYS){
          if(k.startsWith("sha256:") && k.slice(7).toLowerCase() === hx.toLowerCase()){
            meta = window.UCHIHA_KEYS[k]; break;
          }
        }
      }
      if(!meta) return API._fail(keyRaw, "Key không tồn tại hoặc sai.", "not_found");

      const keyId = toKeyId(keyRaw);
      const binds = load(STORE_BIND, {});
      const fails = load(STORE_FAILS, {});
      const rec   = binds[keyId] || {};
      const fp    = getFingerprint();

      // đang bị khoá?
      if (rec.locked) {
        const why = rec.reason || "locked";
        const msg =
          why === "expired_lock"   ? "Key đã hết hạn và bị khoá. Vui lòng liên hệ gia hạn." :
          why === "device_mismatch"? "Key đã gắn với thiết bị khác. Truy cập bị chặn." :
          why === "too_many_fail"  ? `Key bị khoá do nhập sai ${FAIL_LIMIT} lần.` :
                                      "Key đang bị khoá.";
        return { ok:false, msg, reason:why, renew:ZALO_RENEW_URL };
      }

      // quá số lần sai → khoá
      if ((fails[keyId]||0) >= FAIL_LIMIT) {
        rec.locked = true; rec.reason = "too_many_fail"; rec.lockAt = now();
        binds[keyId] = rec; save(STORE_BIND, binds);
        return { ok:false, msg:`Key bị khoá do nhập sai ${FAIL_LIMIT} lần. Nhấn “Gia hạn/Liên hệ”.`, reason:"too_many_fail", renew:ZALO_RENEW_URL };
      }

      // ưu tiên exp tuyệt đối trong meta
      if (meta.exp) {
        const expAbs = new Date(meta.exp).getTime();
        if (expAbs && now() > expAbs) {
          rec.locked = true; rec.reason = "expired_lock"; rec.lockAt = now();
          binds[keyId] = rec; save(STORE_BIND, binds);
          return { ok:false, msg:"Key đã hết hạn và bị khoá. Vui lòng liên hệ gia hạn.", reason:"expired_lock", renew:ZALO_RENEW_URL };
        }
      }

      // đã từng bind?
      if (rec.fp) {
        if (rec.fp !== fp) {
          rec.locked = true; rec.reason = "device_mismatch"; rec.lockAt = now();
          binds[keyId] = rec; save(STORE_BIND, binds);
          return { ok:false, msg:"Key đã gắn với thiết bị khác. Truy cập bị chặn.", reason:"device_mismatch", renew:ZALO_RENEW_URL };
        }
        const expAt = meta.exp ? new Date(meta.exp).getTime() : (rec.exp||0);
        if (expAt && now() > expAt) {
          rec.locked = true; rec.reason = "expired_lock"; rec.lockAt = now();
          binds[keyId] = rec; save(STORE_BIND, binds);
          return { ok:false, msg:"Key đã hết hạn và bị khoá. Vui lòng liên hệ gia hạn.", reason:"expired_lock", renew:ZALO_RENEW_URL };
        }
        return { ok:true, msg:"Xác thực thành công.", exp:expAt||null, note:meta.note||"" };
      }

      // lần đầu bind
      const startISO = new Date().toISOString();
      const expTime  = (meta.exp) ? new Date(meta.exp).getTime()
                                  : (meta.plan ? parsePlanStart(startISO, meta.plan) : 0);

      // quá hạn ngay lúc bind → khoá luôn
      if (expTime && now() > expTime) {
        binds[keyId] = { fp, start:startISO, exp:expTime||0, locked:true, reason:"expired_lock", lockAt:now() };
        save(STORE_BIND, binds);
        return { ok:false, msg:"Key đã hết hạn và bị khoá. Vui lòng liên hệ gia hạn.", reason:"expired_lock", renew:ZALO_RENEW_URL };
      }

      // bind hợp lệ
      binds[keyId] = { fp, start:startISO, exp:expTime||0, locked:false };
      save(STORE_BIND, binds);

      // clear fail counter nếu có
      if (fails[keyId]) { delete fails[keyId]; save(STORE_FAILS, fails); }

      return { ok:true, msg:"Key đã kích hoạt cho thiết bị này.", exp:expTime||null, note:meta.note||"" };
    },

    /** ghi nhận nhập sai + tự khoá nếu vượt limit */
    _fail(keyRaw, message, reason){
      const keyId = toKeyId(keyRaw);
      const fails = load(STORE_FAILS, {});
      fails[keyId] = (fails[keyId]||0) + 1;
      if (fails[keyId] >= FAIL_LIMIT) {
        save(STORE_FAILS, fails);
        const binds = load(STORE_BIND, {});
        const rec = binds[keyId] || {};
        rec.locked = true; rec.reason = "too_many_fail"; rec.lockAt = now();
        binds[keyId] = rec; save(STORE_BIND, binds);
        return { ok:false, msg:`Key bị khoá do nhập sai ${FAIL_LIMIT} lần. Nhấn “Gia hạn/Liên hệ”.`, reason:"too_many_fail", renew:ZALO_RENEW_URL };
      }
      save(STORE_FAILS, fails);
      return { ok:false, msg:message||"Key không hợp lệ.", reason:reason||"invalid" };
    },

    /** Admin reset: gỡ bind & fail counter (chỉ khi cần) */
    adminReset(keyRaw){
      const keyId = toKeyId(keyRaw);
      const binds = load(STORE_BIND, {}); const fails = load(STORE_FAILS, {});
      delete binds[keyId]; delete fails[keyId];
      save(STORE_BIND, binds); save(STORE_FAILS, fails);
      return { ok:true, msg:"Đã xoá bind & fail counter. Key sẵn sàng kích hoạt lại." };
    }
  };

  // Public API
  window.UCHIHA = API;
})();