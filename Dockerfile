###################
# 로컬 개발용 빌드
###################

FROM node:22-alpine AS development

# 앱 디렉토리 생성
WORKDIR /usr/src/app

# node 사용자로 소유권 변경
RUN chown -R node:node /usr/src/app

# 의존성 매니페스트 파일 먼저 복사
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./

# 의존성 설치
RUN npm install --force

# 애플리케이션 소스 복사
COPY --chown=node:node . .

# ✅ `dist` 디렉토리가 존재하도록 하고 올바른 권한 부여
RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app/dist

# 이미지의 node 사용자 사용 (root 사용자 대신)
USER node

###################
# 프로덕션용 빌드
###################

FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

# 프로덕션 번들을 생성하는 빌드 명령 실행
RUN npm run build

# NODE_ENV 환경 변수 설정
ENV NODE_ENV production

# `dist` 폴더에 올바른 권한 부여
RUN chown -R node:node /usr/src/app/dist

# 프로덕션 의존성 설치
RUN npm install --only=production && npm cache clean --force

USER node

###################
# 프로덕션
###################

FROM node:22-alpine AS production

WORKDIR /usr/src/app

# 빌드 단계에서 복사
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# `dist`에 올바른 권한 부여
RUN chown -R node:node /usr/src/app/dist

# 프로덕션 빌드를 사용하여 서버 시작
CMD [ "node", "dist/main.js" ]