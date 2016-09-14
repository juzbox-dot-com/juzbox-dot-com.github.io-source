function split(s) {
    var res = [];
    var arr = s.split('\n');
    for (var i = 0; i < arr.length; i++) {
        var entries = arr[i].split(', ');
        for (var j = 0; j < entries.length; j++) if (entries[j] != "") {
            res.push(entries[j]);
        }
    }
    return res;
}

function match(s, entry) {
    var pat = "^" + entry.prefix + " (.*)";
    var hasOptional = false;
    if (entry.suffix != "") {
        pat += entry.suffix + "(.*)$"
        hasOptional = true;
    } else {
        pat += "$"
    }
    var re = new RegExp(pat);
    var arr = re.exec(s);
    if (arr == null) return null;
    var val = arr[1]
    var context = "";
    if (hasOptional) {
        var opt = arr[2];
        if (opt == "↑") { context = opt; }
        else if (opt == "↓") { context = opt; }
        else if (opt == " (↑以上)") {
            val = ">" + val;
        } else if (opt == " (↓以下)") {
            val = "<" + val;
        }
    }
    var unit = (entry.unit != "") ? (" " + entry.unit) : "";
    return {
        formatted: entry.name + " " + val + unit,
        context: context
    };
}

function parse(ss, entries) {
    var pp = {};
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        for (var j = 0; j < ss.length; j++) {
            var p = match(ss[j], entry);
            if (p == null) continue;
            console.log(p);
            var res = p.formatted + p.context;
            if (p.context != "") {
                res = "<u>" + res + "</u>";
            }
            pp[entry.name] = res;
        }
    }
    return pp;
}

function populate(parsed, format) {
    var res = "";
    var prevIsLiteral = true;
    for (var i = 0; i < format.length; i++) {
        var k = format[i];
        if (k.toLowerCase() == k.toUpperCase()) { // not key
            res += k; // treat as literal
            prevIsLiteral = true;
            continue;
        }
        var sep = prevIsLiteral ? "" : ", ";
        if (parsed.hasOwnProperty(k)) {
            res += sep + parsed[k]
        } else {
            res += sep + k + " pending";
        }
        prevIsLiteral = false;
    }
    return res;
}

// each entry:
//   {prefix} {value}{suffix}{optional}
// optional: "" | "↑" | "↓" | " (↑以上)" | " (↓以下)"

var cbc_entries = [
    { prefix: "WBC", suffix: "×千/μL", name: "WBC", unit: "×10<sup>3</sup>/μL" },
    { prefix: "Hb", suffix: "g/dL", name: "Hb", unit: "g/dL" },
    { prefix: "Plt", suffix: "×万/μL", name: "Plt", unit: "×10<sup>4</sup>/μL" },
    { prefix: "Neutro", suffix: "％ \\(機械値\\)", name: "Neu", unit: "%" },
    { prefix: "Lym", suffix: "％ \\(機械値\\)", name: "Ly", unit: "%" },
    { prefix: "Mono", suffix: "％ \\(機械値\\)", name: "Mono", unit: "%" },
    { prefix: "Eosino", suffix: "％ \\(機械値\\)", name: "Eo", unit: "%" },
    { prefix: "Baso", suffix: "％ \\(機械値\\)", name: "Baso", unit: "%" }
];

function cbc_format(ss) {
    var cbc = parse(ss, cbc_entries);
    var format = [ "WBC", " (", "Neu", "Ly", "Mono", "Eo", "Baso", "), ", "Hb", "Plt" ];
    var s = populate(cbc, format);
    return "[血算] " + s + ".";
}

var coag_entries = [
    { prefix: "PT-INR", suffix: "", name: "PT-INR", unit: "" },
    { prefix: "APTT", suffix: "秒", name: "APTT", unit: "sec" },
    { prefix: "Fbg", suffix: "mg/dl", name: "Fbg", unit: "mg/dL" },
    { prefix: "Dﾀﾞｲﾏ-", suffix: "μg/ml", name: "D-dimer", unit: "μg/mL" },
];

function coag_format(ss) {
    var format = [ "PT-INR", "APTT", "Fbg", "D-dimer" ];
    var parsed = parse(ss, coag_entries);
    return "[凝固] " + populate(parsed, format) + ".";
}

var bc_entries = [
    { prefix: "TP", suffix: "g/dL", name: "TP", unit: "g/dL" },
    { prefix: "Alb", suffix: "g/dL", name: "Alb", unit: "g/dL" },
    { prefix: "LD", suffix: "U/L", name: "LD", unit: "U/L" },
    { prefix: "AST\\(GOT\\)", suffix: "U/L", name: "AST", unit: "U/L" },
    { prefix: "ALT\\(GPT\\)", suffix: "U/L", name: "ALT", unit: "U/L" },
    { prefix: "γ-GTP", suffix: "U/L", name: "γ-GTP", unit: "U/L" },
    { prefix: "ALP", suffix: "U/L", name: "ALP", unit: "U/L" },
    { prefix: "T-Bil", suffix: "mg/dL", name: "T-Bil", unit: "mg/dL" },
    { prefix: "T-Cho", suffix: "mg/dL", name: "T-Cho", unit: "mg/dL" },
    { prefix: "HDL-C", suffix: "mg/dL", name: "HDL-Cho", unit: "mg/dL" },
    { prefix: "TG", suffix: "mg/dL", name: "TG", unit: "mg/dL" },
    { prefix: "Ca", suffix: "mg/dL", name: "Ca", unit: "mg/dL" },
    { prefix: "IP", suffix: "mg/dL", name: "IP", unit: "mg/dL" },
    { prefix: "BUN", suffix: "mg/dL", name: "BUN", unit: "mg/dL" },
    { prefix: "Cre", suffix: "mg/dL", name: "Cre", unit: "mg/dL" },
    { prefix: "Na", suffix: "mmol/L", name: "Na", unit: "mEq/L" },
    { prefix: "K", suffix: "mmol/L", name: "K", unit: "mEq/L" },
    { prefix: "Cl", suffix: "mmol/L", name: "Cl", unit: "mEq/L" },
    { prefix: "UA", suffix: "mg/dL", name: "UA", unit: "mg/dL" },
    { prefix: "Amy", suffix: "U/L", name: "Amy", unit: "U/L" },
    { prefix: "CK", suffix: "U/L", name: "CK", unit: "U/L" },
    { prefix: "CRP", suffix: "mg/dL", name: "CRP", unit: "mg/dL" },
    { prefix: "TSH", suffix: "μU/mL", name: "TSH", unit: "μU/mL" },
    { prefix: "FT4", suffix: "ng/dL", name: "fT4", unit: "ng/dL" },
    { prefix: "FT3", suffix: "pg/mL", name: "fT3", unit: "pg/mL" },
    { prefix: "Glu", suffix: "mg/dL", name: "Glu", unit: "mg/dL" },
    { prefix: "HbA1c\\(N\\)", suffix: "％", name: "HbA1c", unit: "%"},
    { prefix: "VB12", suffix: "pg/mL", name: "VitB12", unit: "pg/mL" },
    { prefix: "ﾖｳｻﾝ", suffix: "ng/mL", name: "Folate", unit: "ng/mL" }
];

function bc_format(ss) {
    var format = ["TP","Alb","LD","AST","ALT","γ-GTP","ALP","T-Bil","T-Cho","HDL-Cho","TG","Ca","IP","BUN","Cre","Na","K","Cl","UA","Amy","CK","CRP","TSH","fT4","fT3","Glu","HbA1c","VitB12", "Folate"];
    var parsed = parse(ss, bc_entries);
    return "[生化学] " + populate(parsed, format) + ".";
}

var immune_entries = [
    { prefix: "ESR", suffix: "㎜", name: "ESR", unit: "mm/2h" },
    { prefix: "RF", suffix: "IU/mL", name: "RF", unit: "IU/mL" },
    { prefix: "CH50", suffix: "U/mL", name: "CH50", unit: "U/mL" },
    { prefix: "C3", suffix: "mg/dL", name: "C3", unit: "mg/dL" },
    { prefix: "C4", suffix: "mg/dL", name: "C4", unit: "mg/dL" },
    { prefix: "SS-A", suffix: "U/mL", name: "SS-A", unit: "U/mL" },
    { prefix: "SS-B", suffix: "U/mL", name: "SS-B", unit: "U/mL" },
    { prefix: "ｺｳｶｸｺｳﾀｲ", suffix: "", name: "ANA", unit: "" },
    { prefix: "ds-DNA", suffix: "IU/mL", name: "ds-DNA", unit: "IU/mL" },
    { prefix: "ss-DNA", suffix: "U/mL", name: "ss-DNA", unit: "U/mL" },
    { prefix: "MPO-ANCA", suffix: "IU/mL", name: "MPO-ANCA", unit: "IU/mL" },
    { prefix: "PR3-ANCA", suffix: "IU/mL", name: "PR3-ANCA", unit: "IU/mL" }
];

function immune_format(ss) {
    var format = ["ESR","RF","CH50","C3","C4","SS-A","SS-B","ANA","ds-DNA","ss-DNA","MPO-ANCA","PR3-ANCA"];
    var parsed = parse(ss, immune_entries);
    return "[免疫] " + populate(parsed, format) + ".";
}

var infection_entries = [
    { prefix: "STS定性", suffix: "", name: "STS", unit: "" },
    { prefix: "TPAb定性", suffix: "", name: "TPHA", unit: "" },
    { prefix: "HBs-Ag", suffix: "", name: "HBs-Ag", unit: "" },
    { prefix: "HBs-Ab", suffix: "", name: "HBs-Ab", unit: "" },
    { prefix: "HCV-Ab", suffix: "", name: "HCV-Ab", unit: "" },
    { prefix: "ATLA", suffix: "", name: "ATLA", unit: "" }
];

function infection_format(ss) {
    var format = ["STS", "TPHA", "HBs-Ag", "HBs-Ab", "HCV-Ab", "ATLA"];
    var parsed = parse(ss, infection_entries);
    return "[感染症] " + populate(parsed, format) + ".";
}

var ua_entries = [
    { prefix: "SG", suffix: "", name: "SG", unit: "" },
    { prefix: "pH", suffix: "", name: "pH", unit: "" },
    { prefix: "Pro", suffix: "", name: "Prot", unit: "" },
    { prefix: "KET", suffix: "", name: "Ket", unit: "" },
    { prefix: "Glu", suffix: "", name: "Glu", unit: "" },
    { prefix: "潜血", suffix: "", name: "OB", unit: "" },
    { prefix: "Bil", suffix: "", name: "Bil", unit: "" },
    { prefix: "NIT", suffix: "", name: "Nit", unit: "" },
    { prefix: "WBC", suffix: "", name: "WBC", unit: "" },
];

function ua_format(ss) {
    var format =["SG", "pH", "Prot", "Ket", "Glu", "OB", "Bil", "Nit", "WBC"];
    var parsed = parse(ss, ua_entries);
    return "[尿] " + populate(parsed, format) + ".";
}

$(function() {
    $('#btn-format').click(function(e) {
        var cbc = $('#cbc').val();
        var coag = $('#coag').val();
        var biochem = $('#biochem').val();
        var bs = $('#bs').val();
        var esr = $('#esr').val();
        var urin = $('#urin').val();
        var p = cbc_format(split(cbc)) + "<br>";
        p += coag_format(split(coag)) + "<br>";
        var integrated = split(biochem);
        integrated = integrated.concat(split(bs), split(esr));
        p += bc_format(integrated) + "<br>";
        p += immune_format(integrated) + "<br>";
        p += infection_format(integrated) + "<br>";
        p += ua_format(split(urin)) + "<br>";
        $('#result').html(p);
        e.preventDefault();
        return false;
    });
});
