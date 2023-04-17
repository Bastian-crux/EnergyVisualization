<template>
  <div id="index">
    <transition name="fade">
      <Loader v-if="loaded" :progress="percent" @initPage="initPage" />
    </transition>
    <!--  title-->
    <transition name="text">
      <div
        v-if="vPosition < 500 && !loaded"
        class="absolute center"
        style="top: 20%; color: white; width: 100%; text-align: center"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">
          能 &nbsp;&nbsp; 源 &nbsp;&nbsp; 轨 &nbsp;&nbsp; 迹
        </h1>
        <div>
          中 &nbsp&nbsp 国 &nbsp&nbsp 能 &nbsp&nbsp 源 &nbsp&nbsp 发 &nbsp&nbsp
          展 &nbsp&nbsp 历 &nbsp&nbsp 史
        </div>
      </div>
    </transition>
    <!--  stage1-->
    <!--  subtitle-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; right: 10%; top: 20%"
        v-if="vPosition > 2200 && vPosition < 3900"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">探索能源发展阶段</h1>
        <hr class="hr-solid" />
      </div>
    </transition>
    <!--      timeline1 introduction-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; right: 10%; top: 37%"
        v-if="vPosition > 2200 && vPosition < 4000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <p style="color: rgb(164, 164, 164); text-indent: 2em">
          党成立初期，以安源路矿大罢工为代表的能源产业工人在党的领导下，团结发动工人，为实现民族独立、人民解放，进行了艰苦卓绝的斗争，在中国工人运动史和革命史上写下了重要篇章。
          革命战争时期，能源产业工人积极开展油田、水电等能源项目建设，有力支持了党的根据地建设；
          同时积极自力更生，建成沕沕水水电站等发电设施，积累能源生产的经验和技术以及领导工业建设的经验。
        </p>
      </div>
    </transition>
    <!--    timeline1-1-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; right: 22%; top: 16%"
        v-if="vPosition > 4100 && vPosition < 6000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <v-timeline align="center" theme="dark" class="timeline">
          <v-timeline-item size="20">
            <template v-slot:opposite></template>
            <div>
              <div class="text-h6">团结发动工人</div>
            </div>
          </v-timeline-item>
          <v-timeline-item size="10" dot-color="rgba(255, 255, 255, 0.8)">
            <template v-slot:opposite>
              <div>安源路矿</div>
            </template>
            1922.9
          </v-timeline-item>
          <v-timeline-item size="10" dot-color="rgba(255, 255, 255, 0.6)">
            <template v-slot:opposite>1922.10</template>
            <div>
              <p>开滦五矿</p>
            </div>
          </v-timeline-item>
          <v-timeline-item size="10" dot-color="rgba(255, 255, 255, 0.4)">
            <template v-slot:opposite>
              <div>
                <p>焦作煤矿</p>
              </div>
            </template>
            1925
          </v-timeline-item>
          <v-timeline-item size="10" dot-color="rgba(255, 255, 255, 0.2)">
            <template v-slot:opposite> 1927</template>
            <div>
              <p>枣庄矿区</p>
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
    </transition>
    <!--      timeline1-2-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; right: 2%; bottom: 12%"
        v-if="vPosition > 5100 && vPosition < 6000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <v-timeline align="center" theme="dark" class="timeline">
          <v-timeline-item size="20">
            <template v-slot:opposite></template>
            <div>
              <div class="text-h6">积极自力更生</div>
            </div>
          </v-timeline-item>
          <v-timeline-item size="10" dot-color="rgba(255, 255, 255, 0.8)">
            <template v-slot:opposite> 1942 </template>
            <div style="font-size: 10px; color: rgba(255, 255, 255, 0.8)">
              延安机关单位
            </div>
            <div>建立煤矿保证煤炭供应</div>
          </v-timeline-item>
          <v-timeline-item size="10" dot-color="rgba(255, 255, 255, 0.6)">
            <template v-slot:opposite>
              <div style="font-size: 10px; color: rgba(255, 255, 255, 0.8)">
                刘伯承电厂挂牌
              </div>
              <div>解放区第一座发电厂 &nbsp;&nbsp;</div>
            </template>
            <div>1946</div>
          </v-timeline-item>
          <v-timeline-item size="10" dot-color="rgba(255, 255, 255, 0.4)">
            <template v-slot:opposite> 1948 </template>
            <div style="font-size: 10px; color: rgba(255, 255, 255, 0.8)">
              利用西柏坡丰沛水利资源&nbsp;&nbsp;
            </div>
            <div>沕沕水发电站</div>
          </v-timeline-item>
        </v-timeline>
      </div>
    </transition>
    <!--      timeline1-3-->
    <div class="img-contain" v-if="vPosition > 6100 && vPosition < 8000">
      <div class="overlay">
        <p class="overlay-text">{{ nowSelectedImgText }}</p>
      </div>
      <transition name="switch">
        <div
          class="absolute"
          style="color: white; width: 400px; right: 12%; top: 20%"
          v-if="vPosition > 6100 && vPosition < 8000"
          @wheel="(e) => !loaded && onScroll(e)"
        >
          <img
            id="myImage"
            class="stage1-big-pic"
            style="object-fit: fill"
            :src="nowSelectedImg"
          />
        </div>
      </transition>
    </div>
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; right: 10%; top: 60%"
        v-if="vPosition > 6100 && vPosition < 8000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <span style="width: 70px; height: 70px">
          <el-image
            v-for="img in imgs"
            @mouseenter="selectImg(img)"
            class="stage1-img"
            :src="img"
            fit="fill"
          />
        </span>
      </div>
    </transition>

    <!--  stage2-->
    <!--      subtitle-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 500px; right: 10%; top: 20%"
        v-if="vPosition > 9000 && vPosition < 10000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">能源恢复和初步发展</h1>
        <hr class="hr-solid" style="width: 430px" />
      </div>
    </transition>
    <!--      introduction-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; right: 16%; top: 37%"
        v-if="vPosition > 9000 && vPosition < 11000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <p style="color: rgb(164, 164, 164); text-indent: 2em">
          新中国成立到改革开放，历经能源工业全面打基础、加快发展以及曲折前进多个时期。
          在煤炭方面，进行了大规模基础建设：煤炭开采和生产技术改造，生产环境和生产设备大大改善。
          与此同时，石油和天然气工业发展迅速。先后开发建设油田与石油炼制工业，产品产量有较大幅度提高。
        </p>
      </div>
    </transition>
    <!--  2-titles-->
    <transition name="slide-up" mode="out-in">
      <div
        class="absolute"
        style="color: white; width: 500px; right: 10%; top: 20%"
        v-if="vPosition > 11000 && vPosition < 11500"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            text-align: center;
            color: rgba(255, 255, 255, 0.4);
            font-size: 32px;
            font-weight: bolder;
          "
        >
          1949-1958 全面恢复时期
        </div>
      </div>
      <div
        class="absolute"
        style="color: white; width: 500px; right: 10%; top: 20%"
        v-else-if="vPosition > 11500 && vPosition < 12000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            text-align: center;
            color: rgba(255, 255, 255, 0.4);
            font-size: 32px;
            font-weight: bolder;
          "
        >
          1958-1966 快速发展时期
        </div>
      </div>

      <div
        class="absolute"
        style="color: white; width: 500px; right: 10%; top: 20%"
        v-else-if="vPosition > 12000 && vPosition < 12500"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            text-align: center;
            color: rgba(255, 255, 255, 0.4);
            font-size: 32px;
            font-weight: bolder;
          "
        >
          1966-1978 曲折前进时期
        </div>
      </div>
    </transition>
    <!--  2-icon-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 600px; right: 6.5%; top: 32%"
        v-if="vPosition > 11000 && vPosition < 12500"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <el-row>
          <el-col :span="6">
            <div
              style="
                text-align: center;
                color: rgba(255, 255, 255, 0.8);
                font-size: 12px;
              "
            >
              <p style="color: rgba(255, 255, 255, 0.6)">煤炭</p>
              <font-awesome-icon
                :icon="['fas', 'fire']"
                size="3x"
                style="margin-top: 10px"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div
              style="
                text-align: center;
                color: rgba(255, 255, 255, 0.8);
                font-size: 12px;
              "
            >
              <p style="color: rgba(255, 255, 255, 0.6)">石油</p>
              <font-awesome-icon
                :icon="['fas', 'gas-pump']"
                size="3x"
                style="margin-top: 10px"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div
              style="
                text-align: center;
                color: rgba(255, 255, 255, 0.8);
                font-size: 12px;
              "
            >
              <p style="color: rgba(255, 255, 255, 0.6)">天然气</p>
              <font-awesome-icon
                :icon="['fas', 'oil-well']"
                size="3x"
                style="margin-top: 10px"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <div
              style="
                text-align: center;
                color: rgba(255, 255, 255, 0.8);
                font-size: 12px;
              "
            >
              <p style="color: rgba(255, 255, 255, 0.6)">电力</p>
              <font-awesome-icon
                :icon="['fas', 'bolt']"
                size="3x"
                style="margin-top: 10px"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </transition>
    <div
      class="absolute"
      style="color: white; width: 600px; right: 6.5%; top: 47%"
    >
      <el-row>
        <el-col :span="6">
          <!--      coal-->
          <transition name="slide-up" mode="out-in">
            <div
              class="coal-event"
              v-if="vPosition > 11000 && vPosition < 11500"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">经历3年恢复期</div>
            </div>
          </transition>
          <transition name="slide-up" mode="out-in">
            <div
              class="coal-event"
              v-if="vPosition > 11500 && vPosition < 12000"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">保持快速发展</div>
            </div>
          </transition>
          <transition name="slide-up" mode="out-in">
            <div
              class="coal-event"
              v-if="vPosition > 12000 && vPosition < 12500"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">供应短缺，促使中央政府放宽政策</div>
            </div>
          </transition>
        </el-col>
        <el-col :span="6">
          <!--      oil-->
          <transition name="slide-up" mode="out-in">
            <div
              class="oil-event"
              v-if="vPosition > 11010 && vPosition < 11510"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">形成玉门、新疆、青海、四川基地</div>
            </div>
          </transition>
          <transition name="slide-up" mode="out-in">
            <div
              class="oil-event"
              v-if="vPosition > 11510 && vPosition < 12010"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">发现大庆油田</div>
            </div>
          </transition>
          <transition name="slide-up" mode="out-in">
            <div
              class="oil-event"
              v-if="vPosition > 12010 && vPosition < 12510"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">大庆油田扩建，产油量连年增高</div>
            </div>
          </transition>
        </el-col>
        <el-col :span="6">
          <!--      power-->
          <transition name="slide-up" mode="out-in">
            <div
              class="power-event"
              v-if="vPosition > 11020 && vPosition < 11520"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">大规模的勘探活动</div>
            </div>
          </transition>
          <transition name="slide-up" mode="out-in">
            <div
              class="power-event"
              v-if="vPosition > 11520 && vPosition < 12020"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">产量来自四川盆地</div>
            </div>
          </transition>
          <transition name="slide-up" mode="out-in">
            <div
              class="power-event"
              v-if="vPosition > 12020 && vPosition < 12520"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">产量逐步增加</div>
            </div>
          </transition>
        </el-col>
        <el-col :span="6">
          <!--      gas-->
          <transition name="slide-up" mode="out-in">
            <div
              class="gas-event"
              v-if="vPosition > 11030 && vPosition < 11530"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">电站和电网工程规划并建设</div>
            </div>
          </transition>
          <transition name="slide-up" mode="out-in">
            <div
              class="gas-event"
              v-if="vPosition > 11530 && vPosition < 12030"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">供应能力稳定增长</div>
            </div>
          </transition>
          <transition name="slide-up" mode="out-in">
            <div
              class="gas-event"
              v-if="vPosition > 12030 && vPosition < 12530"
              @wheel="(e) => !loaded && onScroll(e)"
            >
              <div class="stage2-event">中小型水电站发展迅速</div>
            </div>
          </transition>
        </el-col>
      </el-row>
    </div>
    <!--    bar-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 500px; left: 5%; top: 10%"
        v-if="vPosition > 13000 && vPosition < 15000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-size: 32px;
            font-weight: bolder;
          "
        >
          部分领域实现自给自足
        </div>
      </div>
    </transition>
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 50%; left: 5%; top: 20%"
        v-if="vPosition > 13000 && vPosition < 15000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <PowerBar></PowerBar>
      </div>
    </transition>
    <!--      bar number-->
    <transition name="switch">
      <div
        class="absolute"
        style="
          color: white;
          text-align: right;
          width: 45%;
          left: 5%;
          top: 20%;
          margin: 20px auto;
        "
        v-if="vPosition > 13000 && vPosition < 15000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div>
          <div style="height: 52px">
            <span class="larger-num">16</span>
            <span style="color: rgba(255, 255, 255, 0.6); font-size: 10px">
              倍</span
            >
            <span class="larger-num">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
          <div style="height: 52px">
            <span class="larger-num">35</span>
            <span style="color: rgba(255, 255, 255, 0.6); font-size: 10px">
              倍</span
            >
            <span class="larger-num">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
          <div style="height: 52px">
            <span class="larger-num">69</span>
            <span style="color: rgba(255, 255, 255, 0.6); font-size: 10px">
              倍</span
            >
            <span class="larger-num">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
          <div style="height: 52px">
            <span class="larger-num">833</span>
            <span style="color: rgba(255, 255, 255, 0.6); font-size: 10px">
              倍</span
            >
            <span class="larger-num">&nbsp;&nbsp;</span>
          </div>
          <div style="height: 52px">
            <span class="larger-num">1264</span>
            <span style="color: rgba(255, 255, 255, 0.6); font-size: 10px">
              倍</span
            >
          </div>
        </div>
      </div>
    </transition>
    <!--  stage3-->
    <!--    subtitle-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 8%; top: 20%"
        v-if="vPosition > 16000 && vPosition < 17000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">解决能源供应短缺</h1>
        <hr class="hr-solid" />
      </div>
    </transition>
    <!--    introduction-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 8%; top: 37%"
        v-if="vPosition > 16000 && vPosition < 17000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div style="color: rgb(164, 164, 164); text-indent: 2em">
          改革开放以后，为满足我国经济快速发展对能源供应的需求，从1978年起，能源工业通过不断加大投资力度、改革管理体制和管理方式、改变运行机制和加强国际合作，极大地促进了能源工业的发展。
          为发展煤炭工业、稳定原油产量、消除电力供应的瓶颈，根据不同的具体症结采取措施、进行改革。
        </div>
      </div>
    </transition>
    <!--    board1-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 6%; top: 20%"
        v-if="vPosition > 17000 && vPosition < 18000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            height: 300px;
            width: 400px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            border: 1px solid transparent;
            box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.1);
            padding: 20px 20px;
          "
        >
          <div style="font-size: 26px; font-weight: bolder; text-align: center">
            具体症结
          </div>
          <hr class="hr-solid" />
          <font-awesome-icon :icon="['fas', 'fire']" size="xl" />
          <span style="margin: 10px; font-weight: bolder">煤炭短缺</span>
          <div
            style="
              text-indent: 2em;
              font-size: 12px;
              color: rgba(255, 255, 255, 0.8);
              padding: 5px 0;
            "
          >
            放开市场准入所有制限制和部门限制；从山西运输煤炭
          </div>
          <hr class="hr-solid" />
          <font-awesome-icon :icon="['fas', 'bolt']" size="xl" />
          <span style="margin: 10px; font-weight: bolder">电力短缺</span>
          <div
            style="
              text-indent: 2em;
              font-size: 12px;
              color: rgba(255, 255, 255, 0.8);
              padding: 5px 0;
            "
          >
            通过集资扩、新建电厂，卖用电权的方式集资办电；政企分开，省为实体，联合电网，统一调度
          </div>
          <hr class="hr-solid" />
          <font-awesome-icon :icon="['fas', 'oil-well']" size="xl" />
          <span style="margin: 10px; font-weight: bolder">油气机制不灵活</span>
          <div
            style="
              text-indent: 2em;
              font-size: 12px;
              color: rgba(255, 255, 255, 0.8);
              padding: 5px 0;
            "
          >
            油价双轨；1亿吨原油产量包干，计划内平价，计划外高价
          </div>
        </div>
      </div>
    </transition>
    <!--    boards policy-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 35%; top: 35%"
        v-if="vPosition > 17010 && vPosition < 18000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            height: 40px;
            width: 200px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            border: 1px solid transparent;
            box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.1);
            padding: 10px 10px;
            text-align: center;
          "
        >
          <div style="font-size: 12px; color: rgba(255, 255, 255, 0.8)">
            <span>以煤定产</span>
            <font-awesome-icon
              :icon="['fass', 'arrow-right']"
              size="lg"
              style="padding: 0 5px"
            />
            <span>以销定产</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 35%; top: 47%"
        v-if="vPosition > 17020 && vPosition < 18000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            height: 40px;
            width: 200px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            border: 1px solid transparent;
            box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.1);
            padding: 10px 10px;
            text-align: center;
          "
        >
          <div style="font-size: 12px; color: rgba(255, 255, 255, 0.8)">
            <span>独家办电</span>
            <font-awesome-icon
              :icon="['fass', 'arrow-right']"
              size="lg"
              style="padding: 0 5px"
            />
            <span>各方办电</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 35%; top: 59%"
        v-if="vPosition > 17030 && vPosition < 18000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            height: 65px;
            width: 200px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            border: 1px solid transparent;
            box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.1);
            padding: 10px 10px;
            text-align: center;
          "
        >
          <div>
            <span style="font-size: 12px; color: rgba(255, 255, 255, 0.8)"
              >超产石油创造外汇，为国内石油工业勘探开发，提供资金支持</span
            >
          </div>
        </div>
      </div>
    </transition>
    <!--  stage4-->
    <!--  title-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; right: 10%; top: 20%"
        v-if="vPosition > 24000 && vPosition < 25500"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">能源快速扩张阶段</h1>
        <hr class="hr-solid" />
      </div>
    </transition>
    <!--  4-introduction-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; right: 10%; top: 37%"
        v-if="vPosition > 24000 && vPosition < 25500"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <p style="color: rgb(230, 230, 230); text-indent: 2em">
          我国经济进入新一轮的高速增长期，能源改革面临如何建立适合市场经济管理体制的新形势，部门调整、能源企业重组、行业结构调整等体制机制改革加速进行。
          该阶段能源改革的特征是，有目标地加快体制机制建设来适应市场经济，也广泛吸收西方市场体制机制为我所用，探索和建立计划经济向社会主义市场经济合理过渡的能源管理模式。
        </p>
      </div>
    </transition>
    <!--      timeline-->
    <transition name="slide-up-timeline" mode="out-in">
      <div
        class="absolute"
        style="color: white; width: 600px; right: 5%; top: 25%"
        v-if="vPosition > 25500 && vPosition < 26250"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <v-timeline
          direction="horizontal"
          style="color: white"
          line-inset="-100"
          line-color="rgba(255,255,255,0.8)"
        >
          <v-timeline-item
            max-width="120px"
            size="10"
            dot-color="rgba(255, 255, 255, 1)"
          >
            <template v-slot:opposite>1992</template>
            <div class="stage4-box">
              <font-awesome-icon :icon="['fas', 'fire']" size="xl" />
              <span style="margin: 5px; font-weight: bolder"
                >中央直属大煤矿，地方国有煤矿，乡镇煤矿，各占三分之一</span
              >
            </div>
          </v-timeline-item>
          <v-timeline-item
            max-width="120px"
            size="10"
            dot-color="rgba(255, 255, 255, 1)"
          >
            <template v-slot:opposite>1993</template>
            <div class="stage4-box" style="height: 80px">
              <font-awesome-icon :icon="['fas', 'bolt']" size="xl" />
              <span style="margin: 5px; font-weight: bolder"
                >撤销能源部成立电力工业部</span
              >
            </div>
          </v-timeline-item>

          <v-timeline-item
            max-width="120px"
            size="10"
            dot-color="rgba(255, 255, 255, 1)"
          >
            <template v-slot:opposite>1997</template>
            <div class="stage4-box" style="height: 60px">
              <font-awesome-icon :icon="['fas', 'bolt']" size="xl" />
              <span style="margin: 5px; font-weight: bolder"
                >国家电力公司成立</span
              >
            </div>
          </v-timeline-item>
          <v-timeline-item
            max-width="120px"
            size="10"
            dot-color="rgba(255, 255, 255, 1)"
          >
            <template v-slot:opposite>1998</template>
            <div style="display: table-cell; vertical-align: middle">
              <el-row>
                <el-col span="24">
                  <div class="stage4-box-double" style="height: 80px">
                    <font-awesome-icon :icon="['fas', 'fire']" size="xl" />
                    <span
                      style="margin: 5px; font-weight: bolder; font-size: 10px"
                      >关井压产+关闭破产的政策，使得多数煤炭公司转变为地方国有</span
                    >
                  </div>
                </el-col>
                <el-col span="24">
                  <div class="stage4-box-double">
                    <font-awesome-icon :icon="['fas', 'oil-well']" size="xl" />
                    <span
                      style="margin: 5px; font-weight: bolder; font-size: 10px"
                      >石油天然气和石化总公司重组，成为上下游产业连通的综合性企业集团公司</span
                    >
                  </div>
                </el-col>
              </el-row>
            </div>
          </v-timeline-item>
          <v-timeline-item
            max-width="120px"
            size="10"
            dot-color="rgba(255, 255, 255, 1)"
          >
            <template v-slot:opposite>1999</template>
            <div class="stage4-box">
              <font-awesome-icon :icon="['fas', 'oil-well']" size="xl" />
              <span style="margin: 5px; font-weight: bolder"
                >中国石油、中国石化、中国海油开展企业内部重组，组建股份公司</span
              >
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
    </transition>
    <transition name="slide-up-timeline" mode="out-in">
      <div
        class="absolute"
        style="color: white; width: 600px; right: 5%; top: 28%"
        v-if="vPosition > 26250 && vPosition < 27000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <v-timeline
          direction="horizontal"
          style="color: white"
          line-inset="-100"
          line-color="rgba(255,255,255,0.8)"
        >
          <v-timeline-item
            max-width="120px"
            size="10"
            dot-color="rgba(255, 255, 255, 1)"
          >
            <template v-slot:opposite>2002</template>
            <div class="stage4-box">
              <font-awesome-icon :icon="['fas', 'bolt']" size="xl" />
              <span style="margin: 5px; font-weight: bolder"
                >放开市场准入所有制限制和部门限制；从山西运输煤炭</span
              >
            </div>
          </v-timeline-item>
          <v-timeline-item
            max-width="120px"
            size="10"
            dot-color="rgba(255, 255, 255, 1)"
          >
            <template v-slot:opposite>2004</template>
            <div class="stage4-box" style="height: 60px">
              <font-awesome-icon :icon="['fas', 'bolt']" size="xl" />
              <span style="margin: 5px; font-weight: bolder"
                >出台标杆上网电价政策</span
              >
            </div>
          </v-timeline-item>
          <v-timeline-item
            max-width="1200px"
            size="10"
            dot-color="rgba(255, 255, 255, 1)"
          >
            <template v-slot:opposite>2005-2006</template>
            <div class="stage4-box" style="height: 60px">
              <font-awesome-icon :icon="['fas', 'bolt']" size="xl" />
              <span style="margin: 5px; font-weight: bolder"
                >先后实行两次煤电行动</span
              >
            </div>
          </v-timeline-item>
          <v-timeline-item
            max-width="120px"
            size="10"
            dot-color="rgba(255, 255, 255, 1)"
          >
            <template v-slot:opposite>2009</template>
            <div class="stage4-box">
              <font-awesome-icon :icon="['fas', 'bolt']" size="xl" />
              <span style="margin: 5px; font-weight: bolder"
                >我国自主研发、设计建设的首个特高压交流工程</span
              >
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
    </transition>
    <!--  stage5-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 8%; top: 20%"
        v-if="vPosition > 32000 && vPosition < 33000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <h1 style="font-size: 48px">绿色能源转型阶段</h1>
        <hr class="hr-solid" />
      </div>
    </transition>
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 8%; top: 37%"
        v-if="vPosition > 32000 && vPosition < 33000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <p style="text-indent: 2em">
          在市场环境、政策环境以及国际气候环境驱动下，我国新能源产业进入高速发展阶段。逐渐形成了支持新能源快速发展的政策体系，新能源装备制造能力位居世界前列，同时关键技术取得了突破。
          也在产业政策作用下，逐渐解决能源体系面临重构以及电力系统不适应经济社会发展导致的的问题。
        </p>
      </div>
    </transition>
    <!--    boxes 1-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 500px; left: 10%; top: 10%"
        v-if="vPosition > 33000 && vPosition < 34000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-size: 22px;
            font-weight: bolder;
          "
        >
          症结——能源体系面临重构
        </div>
      </div>
    </transition>
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 500px; left: 10%; top: 10%"
        v-if="vPosition > 34000 && vPosition < 35000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-size: 22px;
            font-weight: bolder;
          "
        >
          对策——构建清洁、低碳、安全、高效的能源体系
        </div>
      </div>
    </transition>

    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 8%; top: 20%"
        v-if="vPosition > 33000 && vPosition < 34000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>能源安全面临巨大挑战</div>
        </div>
      </div>
    </transition>
    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 8%; top: 20%"
        v-if="vPosition > 34000 && vPosition < 35000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>控制化石能源总量</div>
        </div>
      </div>
    </transition>

    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 18%; top: 20%"
        v-if="vPosition > 33000 && vPosition < 34000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>开发利用的清洁化水平低</div>
        </div>
      </div>
    </transition>
    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 18%; top: 20%"
        v-if="vPosition > 34000 && vPosition < 35000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>着力提高利用能效</div>
        </div>
      </div>
    </transition>

    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 28%; top: 20%"
        v-if="vPosition > 33000 && vPosition < 34000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>实施可再生能源替代行动</div>
        </div>
      </div>
    </transition>
    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 28%; top: 20%"
        v-if="vPosition > 34000 && vPosition < 35000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>能源消费导致碳排放不断增长</div>
        </div>
      </div>
    </transition>

    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 38%; top: 20%"
        v-if="vPosition > 33000 && vPosition < 34000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>能源利用效率总体偏低</div>
        </div>
      </div>
    </transition>
    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 38%; top: 20%"
        v-if="vPosition > 34000 && vPosition < 35000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>深化电力体制改革</div>
        </div>
      </div>
    </transition>
    <!--    boxes 2-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 500px; left: 10%; top: 40%"
        v-if="vPosition > 35000 && vPosition < 36000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-size: 22px;
            font-weight: bolder;
          "
        >
          症结——电力系统不适应经济社会发展
        </div>
      </div>
    </transition>
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 500px; left: 10%; top: 40%"
        v-if="vPosition > 36000 && vPosition < 37000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-size: 22px;
            font-weight: bolder;
          "
        >
          对策——构建以新能源为主体的新型电力系统
        </div>
      </div>
    </transition>

    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 18%; top: 50%"
        v-if="vPosition > 35000 && vPosition < 36000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>电源电网发展不协调</div>
        </div>
      </div>
    </transition>
    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 18%; top: 50%"
        v-if="vPosition > 36000 && vPosition < 37000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>新能源电力相对过剩</div>
        </div>
      </div>
    </transition>

    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 28%; top: 50%"
        v-if="vPosition > 35000 && vPosition < 36000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>火电一度逆势增长</div>
        </div>
      </div>
    </transition>
    <transition name="flip">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 28%; top: 50%"
        v-if="vPosition > 36000 && vPosition < 37000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>碳排放目标完成难度大</div>
        </div>
      </div>
    </transition>
    <!--    boxes 3-->
    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 500px; left: 10%; top: 70%"
        v-if="vPosition > 37000 && vPosition < 38000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div
          style="
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-size: 22px;
            font-weight: bolder;
          "
        >
          目标——加快绿色、低碳转型令实现能源革命
        </div>
      </div>
    </transition>

    <transition name="switch">
      <div
        class="absolute"
        style="color: white; width: 400px; left: 23%; top: 80%"
        v-if="vPosition > 37000 && vPosition < 38000"
        @wheel="(e) => !loaded && onScroll(e)"
      >
        <div class="stage5-box">
          <div>2030碳达峰<br />2060碳中和</div>
        </div>
      </div>
    </transition>

    <!--  进度条-->
    <transition name="switch" mode="out-in">
      <TextScroll v-if="vPosition < 500" />
      <div v-else>
        <IconGroup
          :vPosition="vPosition"
          :processing="processing"
          @relocate="onRelocate"
        />
        <n-progress
          type="line"
          :height="6"
          :color="iconColor"
          :rail-color="skycolor"
          :percentage="vPosition / 400"
          :show-indicator="false"
          style="width: 500px; bottom: 30px"
          class="absolute center"
        />
      </div>
    </transition>

    <Renderer
      ref="renderer"
      @wheel="(e) => !loaded && onScroll(e)"
      @mouseMove="onMove"
      shadow
      antialias
      resize="window"
    >
      <Camera
        ref="camera"
        :position="{ x: 85 + 50, y: 5, z: -50 }"
        :lookAt="{ x: 0 + 50, y: 0, z: 0 }"
        :far="5000"
      />
      <Scene ref="scene">
        <HemisphereLight
          ref="light"
          color="rgb(1, 10, 26)"
          groundColor="rgb(7, 16, 33)"
          :intensity="0.2"
        />
        <!--        <HemisphereLight-->
        <!--          ref="hemi"-->
        <!--          :color="hemiSkyColor"-->
        <!--          :groundColor="hemiGroundColor"-->
        <!--          :position="{ x: 0, y: hemiY, z: 0 }"-->
        <!--          :intensity="0.8"-->
        <!--        />-->

        <PointLight
          ref="sun"
          color="rgb(7, 16, 33)"
          :intensity="0.13"
          :position="{ x: 120, y: 20 }"
          :decay="0"
          cast-shadow
        />
        <DirectionalLight
          ref="dir"
          color="rgb(100, 100, 100)"
          :position="{ x: 20, y: 20, z: 20 }"
          :intensity="0"
          cast-shadow
        />
        <DirectionalLight
          ref="dir_board"
          color="rgb(100, 100, 100)"
          :position="{ x: dirX, y: dirY, z: dirZ }"
          :intensity="1"
          cast-shadow
        />

        <GltfModel
          ref="generator3"
          src="/static/surfScene2.glb"
          dracoPath="/draco/"
          :scale="{ x: 15, y: 15, z: 15 }"
          :position="{ x: 0, y: 0, z: 0 }"
          :rotation="{ y: 2.2 }"
        />
      </Scene>
    </Renderer>
  </div>
</template>

<script>
import * as THREE from "three";
import {
  MathUtils,
  Object3D,
  Vector3,
  AxesHelper,
  DirectionalLightHelper,
} from "three";
import { ref, computed, watch } from "vue";
import { NButton, NProgress } from "naive-ui";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky";
import Loader from "./Loader.vue";
import IconGroup from "./IconGroup.vue";
import TextScroll from "./TextScroll.vue";
import DataList from "@/components/pages/chart/statistic/deprecated/DataList.vue";
import { Pane } from "tweakpane";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass";
import { FXAAShader } from "three/addons/shaders/FXAAShader";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer";
import { RenderPass } from "three/addons/postprocessing/RenderPass";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PowerBar from "@/components/pages/chart/statistic/PowerBar.vue";

const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;

export default {
  components: {
    FontAwesomeIcon,
    PowerBar,
    DataList,
    Loader,
    NButton,
    NProgress,
    IconGroup,
    TextScroll,
  },
  setup() {
    //Loading Manager
    const percent = ref(0);
    THREE.DefaultLoadingManager.onProgress = function (
      url,
      itemsLoaded,
      itemsTotal
    ) {
      percent.value = (itemsLoaded / itemsTotal) * 100;
    };

    //verticle control
    const [rainTime, nightTime, dawnTime, dayTime] = [
      10000, 10000, 10000, 10000,
    ]; // 持续时间

    const vPosition = ref(0);
    const dummy = ref(0); // 记录当前的位置

    // wheel触发
    const onScroll = (ev) => {
      const delY = ev.deltaY;
      dummy.value += delY;
      dummy.value = Math.min(
        Math.max(0, dummy.value),
        rainTime + nightTime + dawnTime + dayTime
      );
    };

    const interval = ref(null);
    const processing = ref(false);

    const onRelocate = (ev) => {
      processing.value = true;
      const old = dummy.value;
      if (old < ev && ev - old > 10) {
        interval.value = setInterval(function () {
          increment(ev);
        }, 0.01);
      } else if (old > ev && old - ev > 10) {
        interval.value = setInterval(function () {
          decrement(ev);
        }, 0.01);
      }
    };

    // 进度条快速推进
    const increment = (ev) => {
      dummy.value += 10;
      if (dummy.value >= ev) {
        clearInterval(interval.value); // 停止该interval id
        processing.value = false;
      }
    };
    // 进度条快速回退
    const decrement = (ev) => {
      dummy.value -= 10;
      if (dummy.value <= ev) {
        clearInterval(interval.value);
        processing.value = false;
      }
    };

    const iconColor = computed(() =>
      vPosition.value > 20000 ? "#4d290b" : "white"
    );

    const rainUnder = computed(() =>
      Math.min(Math.floor((3000 * vPosition.value) / rainTime), 3000)
    );

    const fogDistance = computed(() => {
      if (
        vPosition.value > rainTime &&
        vPosition.value < rainTime + nightTime
      ) {
        return 800 - (500 * (vPosition.value - rainTime)) / nightTime;
      } else if (
        vPosition.value >= rainTime + nightTime &&
        vPosition.value <= rainTime + nightTime + dawnTime / 4
      ) {
        return 300;
      } else if (
        vPosition.value > rainTime + nightTime + dawnTime / 4 &&
        vPosition.value < rainTime + nightTime + dawnTime
      ) {
        return (
          300 +
          (500 * (vPosition.value - rainTime - nightTime - dawnTime / 4)) /
            ((3 * dawnTime) / 4)
        );
      } else {
        return 800;
      }
    });

    const sunHeight = computed(() =>
      Math.min(
        Math.max(
          (200 * (vPosition.value - rainTime - nightTime)) / dawnTime,
          0
        ),
        200
      )
    );
    const dirIntensity = computed(() => {
      let temp = Math.min(
        Math.max(
          (1.5 * (vPosition.value - rainTime - nightTime)) / dawnTime,
          0
        ),
        1.5
      );
      return temp;
    });
    const blend = function (a, b, u) {
      return Math.floor((1 - u) * a + u * b);
    };
    const skycolor = computed(() => {
      const colorFactor = Math.min(
        Math.max((vPosition.value - rainTime - nightTime) / dawnTime, 0),
        1
      );
      return `rgb(${blend(14, 150, colorFactor)},
                  ${blend(29, 190, colorFactor)},
                  ${blend(56, 217, colorFactor)})`;
    });
    const groundcolor = computed(() => {
      const colorFactor = Math.min(
        Math.max((vPosition.value - rainTime - nightTime) / dawnTime, 0),
        1
      );
      return `rgb(${blend(7, 30, colorFactor)},
                  ${blend(16, 81, colorFactor)},
                  ${blend(33, 148, colorFactor)})`;
    });

    //mouse
    const mouseY = ref(0);
    const onMove = (ev) => {
      mouseY.value = -(ev.pageY / window.innerHeight - 0.5) * 5;
    };

    const loaded = ref(true);

    const initPage = () => {
      loaded.value = false;
    };

    //textures
    const imageArray = Array(6).fill("/assets/skybox/sky1.png");

    const NUM_INSTANCES = 800;
    const instances = [];
    const target = new Vector3();
    const dummyO = new Object3D();
    const dummyV = new Vector3();
    for (let i = 0; i < NUM_INSTANCES; i++) {
      instances.push({
        position: new Vector3(rndFS(30), rndFS(30), rndFS(30)),
        scale: 1,
        velocity: new Vector3(rndFS(1.5), rndFS(1.5), rndFS(1.5)),
        attraction: 0.03 + rnd(-0.01, 0.01),
        vlimit: 1 + rnd(-0.1, 0.1),
      });
    }

    const objects = [];
    const nowSelectedImg = ref("images/index/wuyuan_1.webp");
    const nowSelectedImgText = ref("安源路矿");
    const imgs = ref([
      "images/index/wuyuan_1.webp",
      "images/index/kailuan_2.webp",
      "images/index/power_3.webp",
      "images/index/water_4.webp",
    ]);
    const texts = ref({
      "images/index/wuyuan_1.webp": "安源路矿",
      "images/index/kailuan_2.webp": "开滦五矿",
      "images/index/power_3.webp": "刘伯承电厂",
      "images/index/water_4.webp": "沕沕水发电站",
    });

    // pane
    const dirX = ref(20);
    const dirY = ref(20);
    const dirZ = ref(20);
    const hemiY = ref(50);
    const hemiSkyColor = ref("#ffffff");
    const hemiGroundColor = ref("#444444");
    return {
      NUM_INSTANCES,
      instances,
      target,
      dummyO,
      dummyV,
      //vert ctrl
      interval,
      onRelocate,
      processing,
      vPosition,
      dummy,
      iconColor,
      fogDistance,
      onScroll,
      sunHeight,
      skycolor,
      groundcolor,
      rainUnder,
      dirIntensity,
      //page load
      initPage,
      loaded,
      percent,
      //mouse
      onMove,
      mouseY,
      //texture
      imageArray,
      rainCount: 3000,
      dirX,
      dirY,
      dirZ,
      hemiY,
      hemiSkyColor,
      hemiGroundColor,

      objects,
      imgs,
      texts,
      nowSelectedImg,
      nowSelectedImgText,
    };
  },
  mounted() {
    // this.pane = new Pane();
    // // Solar
    // this.pane.addInput(this, "dirX", { min: -200, max: 200 });
    // this.pane.addInput(this, "dirY", { min: -200, max: 200 });
    // this.pane.addInput(this, "dirZ", { min: -200, max: 200 });
    // this.pane.addInput(this, "hemiY", { min: -200, max: 200 });
    // this.pane.addInput(this, "hemiGroundColor");
    // this.pane.addInput(this, "hemiSkyColor");
    //scene core
    this.renderer = this.$refs.renderer;
    this.scene = this.$refs.scene.scene;
    this.camera = this.$refs.camera.camera;
    // this.scene.background = new THREE.Color("#eeedea");

    this.renderer.shadowMapEnabled = true;

    this.scene.fog = new THREE.Fog(this.skycolor, 1, 2000);
    this.dir = this.$refs.dir_board.light;
    const dirHelper = new THREE.DirectionalLightHelper(this.dir, 50, "#ff0000");
    this.scene.add(dirHelper);

    // this.hemi = this.$refs.hemi.light;
    // const hemiHelper = new THREE.HemisphereLightHelper(
    //   this.hemi,
    //   50,
    //   "#ff0000"
    // );
    // this.scene.add(hemiHelper);
    const dirLight = new THREE.DirectionalLight(0xffffff);
    // 平行光的位置
    dirLight.position.set(-0, 40, 50);
    // 是否显示阴影;
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -25;
    dirLight.shadow.camera.left = -25;
    dirLight.shadow.camera.right = 25;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.mapSize.set(1024, 1024);
    this.scene.add(dirLight);

    // Set window size
    let element = document.getElementById("index");
    this.renderer.three.setSize(element.clientWidth, element.clientHeight);
    // skybox
    let texture = [];
    let material = [];
    this.imageArray.forEach((el) =>
      texture.push(new THREE.TextureLoader().load(el))
    );
    // console.log(this.imageArray);
    texture.forEach((el) =>
      material.push(
        new THREE.MeshBasicMaterial({ map: el, side: THREE.BackSide })
      )
    );
    let skyboxGeo = new THREE.BoxGeometry(5000, 5000, 5000);
    let skybox = new THREE.Mesh(skyboxGeo, material);
    this.scene.add(skybox);

    //mouse
    // const mouse = this.$refs.mouse.light;
    // this.pointer = this.renderer.three.pointer;
    // const mouseV3 = this.pointer.positionV3;

    //rain
    const rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.5,
      transparent: true,
    });

    const rainGeo = new THREE.BufferGeometry();
    let rainVert = new Float32Array(this.rainCount * 3);
    for (let i = 0; i < this.rainCount; i++) {
      (rainVert[i * 3] = Math.random() * 400 - 200),
        (rainVert[i * 3 + 1] = Math.random() * 250),
        (rainVert[i * 3 + 2] = Math.random() * 400 - 200);
    }
    rainGeo.setAttribute("position", new THREE.BufferAttribute(rainVert, 3));
    this.rain = new THREE.Points(rainGeo, rainMaterial);
    this.scene.add(this.rain);
    const positions = this.rain.geometry.attributes.position.array;

    //water
    const waterGeometry = new THREE.CircleGeometry(500, 100);
    const water = new Water(waterGeometry, {
      textureWidth: 1000,
      textureHeight: 1000,
      waterNormals: new THREE.TextureLoader().load(
        "/assets/textures/water.jpg",
        function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      waterColor: this.groundcolor,
      sunColor: this.skycolor,
      distortionScale: 5,
      fog: this.scene.fog !== undefined,
    });
    this.water = water;
    water.rotation.x = -Math.PI / 2;
    this.scene.add(water);

    //将坐标轴添加进场景
    this.scene.add(new THREE.AxesHelper(500));

    const cameraOffsetX = 50;
    //ANIMATION LOOP
    this.renderer.onBeforeRender(() => {
      water.material.uniforms["time"].value += 0.7 / 60.0;
      if (this.vPosition > 2400) {
        this.camera.position.x =
          Math.cos((this.vPosition - 2400) / 3000) * 150 + cameraOffsetX;
        this.camera.position.z = Math.sin((this.vPosition - 2400) / 3000) * 200;
      }

      if (this.vPosition < 2000) {
        this.camera.position.set(
          (-150 * this.vPosition) / 2000 + 300 + cameraOffsetX,
          (-40 * this.vPosition) / 2000 + 100 + this.mouseY,
          (-100 * this.vPosition) / 2000 + 100
        );
        this.camera.lookAt(
          0 + cameraOffsetX,
          35 - (15 * this.vPosition) / 2000,
          (-30 * this.vPosition) / 2000
        );
      } else if (this.vPosition < 2400) {
        this.camera.position.y = 60 + this.mouseY;
        this.camera.lookAt(
          0 + cameraOffsetX,
          20,
          -30 - (20 * (this.vPosition - 2000)) / 400
        );
      } else if (this.vPosition < 9000) {
        this.camera.position.y =
          60 + 40 * ((this.vPosition - 2400) / 6600) + this.mouseY;
        this.camera.lookAt(
          (30 * (this.vPosition - 2400)) / 6600 + cameraOffsetX,
          20,
          -50 + (80 * (this.vPosition - 2400)) / 6600
        );
      } else if (this.vPosition < 12000) {
        this.camera.position.y =
          100 - (50 * (this.vPosition - 9000)) / 3000 + this.mouseY;
        this.camera.lookAt(
          30 + cameraOffsetX,
          20 - (20 * (this.vPosition - 9000)) / 3000,
          30
        );
      } else if (this.vPosition < 14000) {
        this.camera.lookAt(
          30 - (30 * (this.vPosition - 12000)) / 2000 + cameraOffsetX,
          0,
          30 - (30 * (this.vPosition - 12000)) / 2000
        );
        this.camera.position.y =
          50 + (20 * (this.vPosition - 12009)) / 2000 + this.mouseY;
      } else if (this.vPosition < 18000) {
        this.camera.lookAt(
          0 + cameraOffsetX,
          (20 * (this.vPosition - 14000)) / 4000,
          0
        );
        this.camera.position.y = 70 + this.mouseY;
      } else {
        this.camera.lookAt(0 + cameraOffsetX, 20, 0);
        this.camera.position.y = 70 + this.mouseY;
      }

      this.vPosition = this.lerp(this.vPosition, this.dummy, 0.1); // ?
      if (!this.loaded) {
        // 缓慢推进
        this.dummy += 5;
      }
      // console.log(this.scene);
      // if (this.scene.children.length === 13 && this.objects.length === 0) {
      //   this.getMesh(this.scene.children);
      // }
      //mouse
      // mouse.position.copy(mouseV3);

      //rain
      for (let i = 0; i < this.rainCount; i++) {
        if (positions[3 * i + 1] > 0) {
          positions[3 * i + 1] -= 2;
        } else if (positions[3 * i + 1] > -10) {
          positions[3 * i + 1] = 250;
        }
      }
      this.rain.geometry.attributes.position.needsUpdate = true;
    });
  },
  unmounted() {
    // this.disposeScene();
  },
  watch: {
    rainUnder(val, old) {
      const positions = this.rain.geometry.attributes.position.array;
      if (val > old) {
        const lessRain = val - old;
        for (let i = 0; i < lessRain; i++) {
          positions[3 * (this.rainUnder - lessRain + i) + 1] = -50;
        }
      } else {
        const moreRain = old - val;
        for (let i = 0; i < moreRain; i++) {
          positions[3 * (this.rainUnder + i) + 1] = Math.random() * 250;
        }
      }
      this.rain.geometry.attributes.position.needsUpdate = true;
    },
    skycolor(val, old) {
      this.$refs.light.light.color.set(val);
      const fog = this.$refs.scene.scene.fog;
      fog.color.set(this.skycolor);
      this.water.material.uniforms["sunColor"].value = new THREE.Color(val);
    },
    groundcolor(val, old) {
      this.$refs.light.light.groundColor.set(val);
      this.$refs.sun.light.color.set(val);
      this.water.material.uniforms["waterColor"].value = new THREE.Color(val);
    },
    sunHeight(val, old) {
      this.$refs.sun.light.position.y = val;
      // console.log(this.$refs.sun.light.position.y);
    },
    fogDistance(val, old) {
      this.$refs.scene.scene.fog.far = val;
    },
    dirIntensity(val) {
      this.$refs.dir.light.intensity = val;
      // console.log(this.$refs.dir.light.intensity);
    },
  },

  methods: {
    getMesh(parent) {
      parent.forEach((item) => {
        if (item.type === "Mesh") {
          item.castShadow = true;
          item.receiveShadow = true;

          this.objects.push(item);
        } else if (item.type === "Group") {
          item.castShadow = true;
          item.receiveShadow = true;
          this.getMesh(item.children);
        }
      });
    },
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    },
    disposeScene() {
      this.removeModel(null, this.scene);

      // scene.background.dispose();
      // viewControls2.dispose();
      //处理当前的渲染环境

      this.renderer.dispose();

      //模拟WebGL环境的丢失。
      this.renderer.forceContextLoss();
      //在内部用于处理场景渲染对象的排序注销
      this.renderer.renderLists.dispose();
      //renderer的渲染容器删除
      this.renderer.domElement = null;
      //释放renderer变量的内存
      this.renderer = null;
      //清除所有缓存中的值。
      THREE.Cache.clear();
      this.scene.remove();

      // this.camera = null;
      // this.scene = null;
      // renderer = null;
      // viewControls2 = null;
      // model = null;
      // composer = null;
      // outlinePass = null;
      // renderPass = null;
      // element = null;
      // stats = null;

      // cancelAnimationFrame(animateId);
      // animateId = null;
    },
    removeModel(parent, child) {
      if (child.children.length) {
        let arr = child.children.filter((x) => x);
        arr.forEach((a) => {
          this.removeModel(child, a);
        });
      }
      if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
        child.geometry.dispose();
      } else if (child.material) {
        child.material.dispose();
      }
      this.scene.remove(child);
      if (parent) {
        parent.remove(child);
      }
    },
    selectImg(param) {
      const that = this;
      let image = document.getElementById("myImage");
      image.classList.add("fade");
      setTimeout(function () {
        image.classList.remove("fade");
        that.nowSelectedImg = param;
        that.nowSelectedImgText = that.texts[param];
      }, 500);
    },
  },
};
</script>

<style scoped>
.switch-enter-active,
.switch-leave-active {
  --transition-time: 1s;
}

* {
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
}
body {
  margin: 0;
}
a {
  text-decoration: inherit;
  color: inherit;
}
canvas {
  display: block;
}
.absolute {
  position: absolute;
}
.center {
  transform: translate(-50%, 0);
  left: 50%;
}

.btn::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--border-height);
  background-color: white;
  transition: transform 300ms ease-in-out;
  transform: scaleX(0);
}
.btn:hover::before,
.btn:focus::before {
  transform: scaleX(1);
}

#index {
  height: 100%;
}
.larger-num {
  font-size: 26px;
  font-weight: bolder;
}
.word-box {
  height: 30px;
  margin: 20px auto;
  padding: 0 0;
}
.data {
  color: rgba(255, 255, 255, 0.8);
  text-indent: 2em;
  font-size: 10px;
}
.hr-solid {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.8);
  margin: 10px 6px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.slide-up-timeline-enter-active,
.slide-up-timeline-leave-active {
  transition: all 0.3s ease-out;
}
.slide-up-timeline-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-up-timeline-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.stage2-event {
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  font-weight: bolder;
}
.coal-event {
  text-align: center;
  color: white;
}
.oil-event {
  text-align: center;
  color: white;
}
.power-event {
  text-align: center;
  color: white;
}
.gas-event {
  text-align: center;
  color: white;
}
.stage5-box {
  height: 100px;
  width: 120px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  border: 1px solid transparent;
  box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.1);
  padding: 10px 10px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  font-weight: bolder;
}
.stage5-box-solution {
  height: 100px;
  width: 800px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  border: 1px solid transparent;
  box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.1);
  padding: 10px 10px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  font-weight: bolder;
}
.flip-enter-active {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  transform-origin: 50% 50%;
}
.flip-leave-active {
  transform-origin: 50% 50%;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.flip-enter-from,
.flip-leave-to {
  transform-origin: 50% 50%;
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
.stage4-box {
  height: 100px;
  width: 100px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 10px 5px;
  display: table-cell;
  vertical-align: middle;
  font-size: 12px;
  text-align: center;
}
.stage4-box-double {
  height: 95px;
  width: 100px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 10px 5px;
  font-size: 8px;
  text-align: center;
  margin: 3px auto;
}
.stage1-img {
  height: 60px;
  width: 60px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border: 1px solid transparent;
  box-shadow: 3px 3px 20px 20px rgba(255, 255, 255, 0.05);
  margin: 5px 12px;
}
.stage1-img:hover {
  filter: alpha(Opacity=80);
  -moz-opacity: 0.8;
  opacity: 0.8;
  transform: scale(1.1);
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
}
.stage1-big-pic {
  height: 225px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border: 1px solid transparent;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.1);
  transition: opacity 0.5s ease-in;
}
.fade {
  opacity: 0;
}
.img-contain:hover .overlay {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.5);
  transition: 0.5s all ease-out;
}
.img-contain .overlay {
  position: absolute;
  right: 12%;
  top: 20%;
  height: 225px;
  width: 400px;
  border-radius: 10px;
  z-index: 1000;
  display: block;
  opacity: 0;
  overflow: hidden;
  transition: 0.3s all ease-in;
}
.overlay-text {
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
  line-height: 225px;
  letter-spacing: 5px;
  text-align: center;
}
</style>
